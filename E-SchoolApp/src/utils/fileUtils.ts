import { FileType } from "../types/types";

interface FileWithType {
    type: string;
}

export const fileTypeChecker = (file: FileWithType, type: FileType) => {
    if (!file) return false; // Ensure file exists

    console.log(file)

    switch (type) {
        case 'image':
            return file.type.startsWith('image/'); // Supports all image types (JPEG, PNG, GIF, etc.)

        case 'excel':
            return file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                   file.type === 'application/vnd.ms-excel'; // Supports Excel files (.xlsx, .xls)

        case 'pdf':
            return file.type === 'application/pdf'; // Supports PDF files (.pdf)

        case 'word':
            return file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                   file.type === 'application/msword'; // Supports Word files (.docx, .doc)

        case 'text':
            return file.type === 'text/plain'; // Supports text files (.txt)

        case 'video':
            return file.type.startsWith('video/'); // Supports all video formats (MP4, AVI, etc.)

        case 'audio':
            return file.type.startsWith('audio/'); // Supports all audio formats (MP3, WAV, etc.)

        case 'zip':
            return file.type === 'application/zip' || 
                   file.type === 'application/x-rar-compressed' || 
                   file.type === 'application/x-7z-compressed' || 
                   file.type === 'application/x-tar'; // Supports ZIP, RAR, 7Z, TAR files

        default:
            return false; // Returns false if file type is not recognized
    }
};
