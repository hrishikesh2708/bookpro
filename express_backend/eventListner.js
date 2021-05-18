const event = require("events")
const e = new event();

let  clients = [];
const useServerSentEventsMiddleware = (req, res, next) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders();
  
    const sendEventStreamData = (data) => {
      const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
      // clients.forEach(client => client.res.write(sseFormattedResponse))
      res.write(sseFormattedResponse);
    };
    Object.assign(res, {
      sendEventStreamData,
    });
  
    next();
  };


  const streamRandomNumbers = (req, res) => {
    let interval = setInterval(function generateAndSendRandomNumber() {
      const data = {
        value: Math.random(),
      };
  
      res.sendEventStreamData(data);
    }, 5000);
  
    // close
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      res
    };
  
    clients.push(newClient);
  
    res.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
      clearInterval(interval);
      res.end();
    });
  };
  