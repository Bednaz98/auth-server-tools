import fs from 'fs-extra'

const jabDir = './node_modules/@jabz/'
const defaultPrismaPath = './prisma/'
const prismaConst = "/prisma"

async function getPrismaFiles() {
    const nodeModules: string[] = await fs.readdir(jabDir).catch(() => []).then((e) => e)
    return (await Promise.all(nodeModules.map(async (m) => {
        try {
            let prismaFiles: string[] = (await fs.readdir(jabDir + `/${m}/` + prismaConst).catch(() => []).then((e) => e)) ?? [];
            if (prismaFiles.length < 1) return [];
            const promiseFiles = await Promise.all(prismaFiles.map(async e => {
                return ({ fileName: e.replace(jabDir + m + `${prismaConst}/`, ""), file: (await fs.readFile(jabDir + m + `${prismaConst}/` + e)).toString() })
            }
            ));
            return promiseFiles;
        } catch (error) {
            console.error(error)
            return [];
        }
    }))).reduce((p, c) => ([...p, ...c]), []);
}

(async () => {
    try {
        const rawFiles = await getPrismaFiles();
        const workFunction = rawFiles.map(async e => { fs.writeFile(defaultPrismaPath + `/${e.fileName}`, e.file) })
        await Promise.all(workFunction);
    } catch (error) {
        console.error(error);
    }
})();