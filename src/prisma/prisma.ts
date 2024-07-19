import { PrismaClient } from '@client-gen/test';

export function getDBStringDebug(envString: string | undefined) {
    if (!envString) return "DB string: N/A";
    const firstSplit = envString.split('://')
    const dbType = firstSplit[0]
    const ipAddress = firstSplit[1].split(':')[1].split("@")[1]
    const port = firstSplit[1].split(':')[2].split("/")[0]
    return (`\n- db type: ${dbType}\n- host ip: ${ipAddress}:${port}\n- white check: ${envString.trim() === envString}`);
}


const getPrisma = (): PrismaClient => {
    console.log("\ngenerating prisma client #########################\n");
    try {
        const dbString = process?.env?.["DATABASE_URL"];
        if (dbString) {
            return new PrismaClient({
                datasources: {
                    db: {
                        url: `${dbString?.trim()}/test`,
                    },
                },
            })
        }
        console.log("undefined DB string")
        console.log('direct db string injection failed, using default prisma client\n');
        return new PrismaClient();
    } catch (error) {
        console.log("prisma client error, using default client")
        console.error(error);
        return new PrismaClient();
    }
}

export const prisma = getPrisma();