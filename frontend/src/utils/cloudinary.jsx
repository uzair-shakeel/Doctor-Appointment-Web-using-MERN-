export default function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("No file provided"));
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            console.log("FileReader onload triggered");
            resolve(fileReader.result);
        };

        fileReader.onerror = (err) => {
            console.error("FileReader error:", err);
            reject(err);
        };

        fileReader.readAsDataURL(file);
        console.log("readAsDataURL called");
    });
}
