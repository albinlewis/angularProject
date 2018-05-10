let user = {
    name: "Heinz Müller",
    email: "heinz-mueller@web.de",
    password: "meinsicherespasswort"
};

let plant = {
    _id: 12000,
    detection_supported: true,
    modified: "2018-04-20T01:37:31.000Z",
    created: "2017-03-10T02:37:31.000Z",
    has_nutrient: false,
    modified_image: null,
    image_url: null,
    eppo_code: "",
    name: "Tomato"
};

let disease = {
    _id: 12001,
    detection_supported: false,
    modified: "2017-03-10T02:37:31.000Z",
    created: "2017-03-10T02:37:31.000Z",
    leaf_wetness: "",
    humidity_to: 0,
    humidity_from: 0,
    celsius_low: 0,
    example_url: "",
    bbch_to: 0,
    bbch_from: 0,
    symptoms: "",
    eppo_code: "",
    name: "Bacterial Spot",
    crop_id: 12000
};

let job = {
    image_url: "../pfad/zu/bild.jpg",
    plant: 1002,
    resultId: "kjfejnfnejknfekjnfjejfkf",
    finish: true
}

module.exports = {
    user,
    disease,
    plant
};
