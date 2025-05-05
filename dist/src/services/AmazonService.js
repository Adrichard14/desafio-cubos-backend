"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const bucketName = 'desafio-cubos-fullstack';
const client = new client_s3_1.S3Client({});
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    //   const command = new PutObjectCommand({
    //     Bucket: bucketName,
    //     // Key: file.fileName,
    //     // Body: file.buffer,
    //   });
    //   try {
    //     const response = await client.send(command);
    //     console.log(response);
    //   } catch (caught) {
    //     if (
    //       caught instanceof S3ServiceException &&
    //       caught.name === "EntityTooLarge"
    //     ) {
    //       console.error(
    //         `Error from S3 while uploading object to ${bucketName}. \
    // The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
    // or the multipart upload API (5TB max).`,
    //       );
    //     } else if (caught instanceof S3ServiceException) {
    //       console.error(
    //         `Error from S3 while uploading object to ${bucketName}.  ${caught.name}: ${caught.message}`,
    //       );
    //     } else {
    //       throw caught;
    //     }
    //   }
});
exports.default = uploadFile;
