const axios = require("axios");
const config = require("./config");

const plateUrl = "https://koroxcad.com/api/1.1/wf/platerunner";
const nameUrl = "https://koroxcad.com/api/1.1/wf/namerunner";

RegisterCommand("runplate", async (source, args, raw) => {

    let plate = args[0];

    if (plate == null) {
        return;
    }
    
    let data = await runPlate(plate);

    if (data.stolen) {
        emitNet("chatMessage", source, "That vehicle is stolen!");
    } else {
        emitNet("chatMessage", source, "That vehicle is not stolen!");
    }    
});

RegisterCommand("namecheck", async (source, args) => {

    let name = args.join(" ");

    if (name == null) {
        return;
    }

    let data = await runName(name);

    if (data.name !== null) {
        emitNet("chatMessage", source, 
        `Name: ${data.response.name} | DOB: ${data.response.dob} | Address: ${data.response.address} | Gender: ${data.response.gender}`);
    
    } else {
        emitNet("chatMessage", source, "Oops! That person could not be found.");
    }  
});

async function runPlate(plate) {
    let data = {
        "community": config.community,
        "apisecret": config.apiSecret,
        "plate": plate
    };

    let result = await axios.post(plateUrl, data)
    return result.data.response;
};

async function runName(name) {
    let data = {
        "community": config.community,
        "apisecret": config.apiSecret,
        "name": name
    };

    let result = await axios.post(nameUrl, data)
    return result.data;
};