console.log('Estoy en files.js');

const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

const request = new XMLHttpRequest();

request.open('GET', requestURL);





/*
const imagePreview = document.getElementById("img-preview");
const imageUploader = document.getElementById('img-uploader');
const imageUploadbar = document.getElementById('img-upload-bar');

const CLOUDINARY_URL = ``
const CLOUDINARY_UPLOAD_PRESET = '';

imageUploader.addEventListener('change', async (e) => {
    // console.log(e);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    // Send to cloudianry
    const res = await axios.get(
        CLOUDINARY_URL,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress (e) {
                let progress = Math.round((e.loaded * 100.0) / e.total);
                console.log(progress);
                imageUploadbar.setAttribute('value', progress);
            }
        }
    );
    console.log(res);
    imagePreview.src = res.data.secure_url;
});







const download = (req, res) => {
	const fileName = req.params.name;
	const directoryPath = path.join(__dirname, "..", "uploads");

	res.download(directoryPath + fileName, fileName, (err) => {
		if (err) {
			res.status(500).send({
				message: "Error al descargar el archivo. " + err,
			});
		}
	});
};
*/