module.exports = async () =>
{
    await require("./DatabaseStartup")();

    console.log("awaited truly");
}
