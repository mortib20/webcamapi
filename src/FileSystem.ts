import * as fs from 'fs/promises';
import LazySettings from './LazySettings';

export default class FileSystem {
    private static async GetDirectory() {
        const directoryContent = await fs.readdir(LazySettings.webcamPath);
        const allowedContent = directoryContent.filter(file => this.FileHasAllowedFileExtension(file));
        const orderedByDateContent = allowedContent.sort((a, b) => {
            if (a > b) return -1;
            if (a < b) return 1;

            return 0;
        })

        return orderedByDateContent;
    }

    private static FileHasAllowedFileExtension(file: string) {
        const fileSplit = file.split('.');

        if (!fileSplit[fileSplit.length - 1]) {
            return false;
        }

        const extension = fileSplit[fileSplit.length - 1];
        return LazySettings.allowedFileExtensions.some(allowedExtension => extension === allowedExtension);;
    }

    public static async GetFilesByDate(year: string | undefined = undefined, month: string | undefined = undefined, day: string | undefined = undefined, hour: string | undefined = undefined, minute: string | undefined = undefined, seconds: string | undefined = undefined) {
        const allFiles = await this.GetDirectory();
        const datePatterns = {
            year: year ? year : '\\d{4}',
            month: month ? month : '\d{2}',
            day: day ? day : '\\d{2}',
            hour: hour ? hour : '\\d{2}',
            minute: minute ? minute : '\\d{2}',
            seconds: seconds ? seconds : '\\d{2}',
        }
        const matchPattern = `${datePatterns.year}_${datePatterns.month}_${datePatterns.day}-${datePatterns.hour}_${datePatterns.minute}_${datePatterns.seconds}`;
        const filesWithDate = allFiles.filter(file => file.match(matchPattern));

        return filesWithDate;
    }

    public static async GetFileByName(name: string) {
        try {
            const fileContent = fs.readFile(LazySettings.webcamPath + '/' + name);
            return fileContent;
        } catch(err) {
            return null;
        }
    }
}