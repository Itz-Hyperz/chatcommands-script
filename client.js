setImmediate(() => {
    emit('chat:addSuggestion', '/runplate', 'Fetch data for a plate', [
      {name:"Plate", help:"Vehicle plate [ABC123]"}
    ]);

    emit('chat:addSuggestion', '/namecheck', 'Fetch data for a person', [
        {name:"Name", help:"Enter the name here [James Geralds]"}
      ]);
});

onNet('chatMessage', (message) => {
    emit('chat:addMessage', {
        color: [255, 0, 0],
        multiline: true,
        args: ["System", message]
    });
});