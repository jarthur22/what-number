const brain = require('brain.js');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var dataSet = [];
var count = 0;

const generateInput = () => {
    var val1 = 0;
    var val2 = 0;
    while(val1 === val2){
        val1 = Math.floor(Math.random() * 5) + 1;
        val2 = Math.floor(Math.random() * 5) + 1;
    }
    return [val1, val2];
}

const parseOutput = (values, output) => {
    return output < 0.5 ? values[0] : values[1];
}

const query = () => {
    var inputData = generateInput();

    rl.question(`Choose between these two numbers: \n${inputData[0]} or ${inputData[1]}\n`, (answer) => {
        var outputData = +answer === inputData[0] ? 0 : 1;
        dataSet.push({
            input: inputData,
            output: [outputData]
        });
        if(count < 10){
            count++;
            query();
        } else{
            rl.close();
        }
    });
}

rl.on("close", () => {
    console.log(dataSet);
    const network = new brain.NeuralNetwork();

    network.train(dataSet);

    setInterval(() => {
        var values = generateInput();
        console.log(`Choose between these two numbers: \n${values[0]} or ${values[1]}\n`)
        setTimeout(() => {
            var output = network.run(values);
            console.log(`Was your answer ${parseOutput(values, output)}?`);
        }, 3000);
    }, 5000)
});

query();
