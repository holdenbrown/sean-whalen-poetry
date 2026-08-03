export type DeploymentEnvironment = {
  [key: string]: string | undefined
  NEXT_PUBLIC_BASE_PATH?: string
  NEXT_PUBLIC_SITE_URL?: string
  GITHUB_ACTIONS?: string
  GITHUB_REPOSITORY?: string
}

const externalUrlPattern = /^https?:\/\//i

export function normalizeBasePath(value: string | undefined): string {
  if (value === undefined || value.trim() === "" || value.trim() === "/") {
    return ""
  }

  const normalized = value.trim().replace(/^\/+|\/+$/g, "")

  return normalized ? "/" + normalized : ""
}

export function getBasePath(env: DeploymentEnvironment = process.env): string {
  if (typeof env.NEXT_PUBLIC_BASE_PATH === "string") {
    return normalizeBasePath(env.NEXT_PUBLIC_BASE_PATH)
  }

  if (env.GITHUB_ACTIONS !== "true" || !env.GITHUB_REPOSITORY) {
    return ""
  }

  const repositoryName = env.GITHUB_REPOSITORY.split("/")[1]

  if (!repositoryName || repositoryName.endsWith(".github.io")) {
    return ""
  }

  return "/" + repositoryName
}

export function getSiteUrl(env: DeploymentEnvironment = process.env): string {
  if (env.NEXT_PUBLIC_SITE_URL?.trim()) {
    return normalizeSiteUrl(env.NEXT_PUBLIC_SITE_URL)
  }

  if (env.GITHUB_ACTIONS === "true" && env.GITHUB_REPOSITORY) {
    const [owner, repositoryName] = env.GITHUB_REPOSITORY.split("/")

    if (owner && repositoryName) {
      const path = repositoryName.endsWith(".github.io") ? "" : "/" + repositoryName
      return "https://" + owner + ".github.io" + path
    }
  }

  return "http://localhost:3000"
}

export function withBasePath(
  path: string,
  env: DeploymentEnvironment = process.env
): string {
  if (externalUrlPattern.test(path) || path.startsWith("#")) {
    return path
  }

  const basePath = getBasePath(env)
  const normalizedPath = path.startsWith("/") ? path : "/" + path

  if (
    !basePath ||
    normalizedPath === basePath ||
    normalizedPath.startsWith(basePath + "/")
  ) {
    return normalizedPath
  }

  return basePath + normalizedPath
}

export function absoluteUrl(
  path: string,
  siteUrl: string = getSiteUrl(process.env)
): string {
  if (externalUrlPattern.test(path)) {
    return path
  }

  const base = normalizeSiteUrl(siteUrl)
  const normalizedPath = path.startsWith("/") ? path : "/" + path

  return normalizedPath === "/" ? base + "/" : base + normalizedPath
}

function normalizeSiteUrl(value: string): string {
  const url = new URL(value.trim())

  return url.toString().replace(/\/+$/, "")
}
