// require("dotenv").config();
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "dzdcrka45",
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const TARGET_ASSET_FOLDER = "grova/products";
// const DRY_RUN = false; // true = xem trước, false = rename thật

// function removeCloudinarySuffix(publicId) {
//   // Ví dụ: mint_mneuou -> mint
//   // Ví dụ: image-5_zxpuxa -> image-5
//   // Chỉ xóa đoạn "_" + 6 ký tự cuối
//   return publicId.replace(/_[a-zA-Z0-9]{6}$/, "");
// }

// async function run() {
//   let nextCursor = null;
//   let matched = 0;
//   let skipped = 0;
//   let renamed = 0;

//   do {
//     const result = await cloudinary.api.resources({
//       type: "upload",
//       resource_type: "image",
//       max_results: 100,
//       next_cursor: nextCursor,
//     });

//     for (const asset of result.resources) {
//       if (asset.asset_folder !== TARGET_ASSET_FOLDER) {
//         continue;
//       }

//       matched++;

//       const oldPublicId = asset.public_id;
//       const newPublicId = removeCloudinarySuffix(oldPublicId);

//       if (oldPublicId === newPublicId) {
//         skipped++;
//         console.log("Skip:", oldPublicId);
//         continue;
//       }

//       console.log("Rename:");
//       console.log("FROM:", oldPublicId);
//       console.log("TO:  ", newPublicId);
//       console.log("---");

//       if (!DRY_RUN) {
//         await cloudinary.uploader.rename(oldPublicId, newPublicId, {
//           resource_type: "image",
//           type: "upload",
//           overwrite: false,
//         });
//       }

//       renamed++;
//     }

//     nextCursor = result.next_cursor;
//   } while (nextCursor);

//   console.log("Done.");
//   console.log("Mode:", DRY_RUN ? "Preview only" : "Renamed");
//   console.log("Folder matched:", matched);
//   console.log("Will rename / renamed:", renamed);
//   console.log("Skipped:", skipped);
// }

// run().catch(console.error);