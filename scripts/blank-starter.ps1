[CmdletBinding(DefaultParameterSetName = "Archive")]
param(
  [Parameter(Mandatory = $true, ParameterSetName = "Initialize")]
  [switch]$Initialize,

  [Parameter(Mandatory = $true, ParameterSetName = "Archive")]
  [switch]$Archive,

  [Parameter(Mandatory = $true, ParameterSetName = "Copy")]
  [switch]$Copy,

  [Parameter(Mandatory = $true, ParameterSetName = "Copy")]
  [string]$Destination
)

$ErrorActionPreference = "Stop"

$workspaceRoot = [IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))
$exportsRoot = [IO.Path]::Combine($workspaceRoot, "exports")
$snapshotRoot = [IO.Path]::Combine($exportsRoot, "website-starter-blank")
$archivePath = [IO.Path]::Combine($exportsRoot, "website-starter-blank.zip")
$temporaryArchivePath = [IO.Path]::Combine(
  $exportsRoot,
  "website-starter-blank.tmp.zip"
)
$backupArchivePath = [IO.Path]::Combine(
  $exportsRoot,
  "website-starter-blank.previous.zip"
)
$excludedRoots = @(
  ".git",
  ".next",
  "coverage",
  "docs\research",
  "exports",
  "node_modules",
  "out",
  "playwright-report",
  "test-results"
)

function Test-ExcludedPath {
  param([string]$RelativePath)

  $normalizedPath = $RelativePath.Replace("/", "\")

  foreach ($excludedRoot in $excludedRoots) {
    if (
      $normalizedPath.Equals($excludedRoot, [StringComparison]::OrdinalIgnoreCase) -or
      $normalizedPath.StartsWith(
        $excludedRoot + "\",
        [StringComparison]::OrdinalIgnoreCase
      )
    ) {
      return $true
    }
  }

  $fileName = [IO.Path]::GetFileName($normalizedPath)

  if ($fileName -ne ".env.example" -and $fileName.StartsWith(".env")) {
    return $true
  }

  return (
    $fileName -eq ".DS_Store" -or
    $fileName -eq "Thumbs.db" -or
    $fileName.EndsWith(".log") -or
    $fileName.EndsWith(".tsbuildinfo")
  )
}

function Copy-DirectoryTree {
  param(
    [string]$Source,
    [string]$Target,
    [string]$RelativePrefix = "",
    [bool]$ApplyExclusions = $false
  )

  [IO.Directory]::CreateDirectory($Target) | Out-Null

  foreach ($file in [IO.Directory]::EnumerateFiles($Source)) {
    $relativePath = if ($RelativePrefix) {
      [IO.Path]::Combine($RelativePrefix, [IO.Path]::GetFileName($file))
    } else {
      [IO.Path]::GetFileName($file)
    }

    if ($ApplyExclusions -and (Test-ExcludedPath $relativePath)) {
      continue
    }

    [IO.File]::Copy(
      $file,
      [IO.Path]::Combine($Target, [IO.Path]::GetFileName($file)),
      $false
    )
  }

  foreach ($directory in [IO.Directory]::EnumerateDirectories($Source)) {
    $directoryName = [IO.Path]::GetFileName($directory)
    $relativePath = if ($RelativePrefix) {
      [IO.Path]::Combine($RelativePrefix, $directoryName)
    } else {
      $directoryName
    }

    if ($ApplyExclusions -and (Test-ExcludedPath $relativePath)) {
      continue
    }

    $copyArguments = @{
      Source = $directory
      Target = [IO.Path]::Combine($Target, $directoryName)
      RelativePrefix = $relativePath
      ApplyExclusions = $ApplyExclusions
    }
    Copy-DirectoryTree @copyArguments
  }
}

function New-BlankArchive {
  if (-not [IO.Directory]::Exists($snapshotRoot)) {
    throw "The protected blank snapshot does not exist. Run pnpm blank:init first."
  }

  [IO.Directory]::CreateDirectory($exportsRoot) | Out-Null

  if ([IO.File]::Exists($temporaryArchivePath)) {
    [IO.File]::Delete($temporaryArchivePath)
  }

  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [IO.Compression.ZipFile]::CreateFromDirectory(
    $snapshotRoot,
    $temporaryArchivePath,
    [IO.Compression.CompressionLevel]::Optimal,
    $true
  )

  if ([IO.File]::Exists($archivePath)) {
    if ([IO.File]::Exists($backupArchivePath)) {
      [IO.File]::Delete($backupArchivePath)
    }

    [IO.File]::Replace($temporaryArchivePath, $archivePath, $backupArchivePath)
    [IO.File]::Delete($backupArchivePath)
  } else {
    [IO.File]::Move($temporaryArchivePath, $archivePath)
  }

  Write-Output "Blank starter archive: $archivePath"
}

if ($Initialize) {
  if ([IO.Directory]::Exists($snapshotRoot)) {
    throw "The protected blank snapshot already exists and will not be overwritten."
  }

  [IO.Directory]::CreateDirectory($exportsRoot) | Out-Null
  $snapshotArguments = @{
    Source = $workspaceRoot
    Target = $snapshotRoot
    ApplyExclusions = $true
  }
  Copy-DirectoryTree @snapshotArguments
  New-BlankArchive
  Write-Output "Protected blank snapshot: $snapshotRoot"
  exit 0
}

if ($Copy) {
  if (-not [IO.Directory]::Exists($snapshotRoot)) {
    throw "The protected blank snapshot does not exist. Run pnpm blank:init first."
  }

  $destinationPath = [IO.Path]::GetFullPath($Destination)
  $workspacePrefix = $workspaceRoot + [IO.Path]::DirectorySeparatorChar

  if (
    $destinationPath.Equals($workspaceRoot, [StringComparison]::OrdinalIgnoreCase) -or
    $destinationPath.StartsWith($workspacePrefix, [StringComparison]::OrdinalIgnoreCase)
  ) {
    throw "Choose a destination outside this workspace to avoid nesting projects."
  }

  if ([IO.Directory]::Exists($destinationPath) -or [IO.File]::Exists($destinationPath)) {
    throw "The destination already exists and will not be overwritten: $destinationPath"
  }

  try {
    Copy-DirectoryTree -Source $snapshotRoot -Target $destinationPath
  } catch {
    if ([IO.Directory]::Exists($destinationPath)) {
      [IO.Directory]::Delete($destinationPath, $true)
    }

    throw
  }

  Write-Output "Created a new blank website workspace: $destinationPath"
  Write-Output "Next: open that folder, run pnpm install, then run pnpm verify."
  exit 0
}

New-BlankArchive
