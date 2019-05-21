export function getEnvStr(name: string, defaultValue: string = ""): string {
  const result: string = process.env[name];
  return (result == null || result === "") ? defaultValue : result;
}

export function getEnvArr(name: string, defaultValue: string[] = []): string[] {
  const result: string = process.env[name];
  return (result == null || result === "") ? defaultValue : result.split(";");
}

export function getEnvNum(name: string, defaultValue: number = 0): number {
  const result: string = process.env[name];
  return (result == null || result === "") ? defaultValue : Number(result);
}

export function getEnvJson<T>(name: string, defaultValue?: T): T {
  const result: string = process.env[name];
  return (result == null || result === "") ? defaultValue : JSON.parse(result);
}

export function createJwtConfig(conf: any, domain: string, domains: string[], keyDir: string, serviceName: string,
                                publicKeyFileName?: string, privateKeyFileName?: string): void {
  conf.jwt = {};
  const domainConfig = {};
  domains.forEach((dm: string) => {
    const config: any = {};
    domainConfig[dm] = config;
    if (publicKeyFileName != null && publicKeyFileName !== "") {
      config.publicKeyFile = `${keyDir}/${serviceName}/${dm}/${publicKeyFileName}`;
    }
    if (privateKeyFileName != null && privateKeyFileName !== "") {
      config.privateKeyFile = `${keyDir}/${serviceName}/${dm}/${privateKeyFileName}`;
    }
    if (dm === domain) {
      Object.assign(conf.jwt, config);
    }
  });
  conf.jwt.domains = domainConfig;
}
