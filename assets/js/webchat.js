window.watsonAssistantChatOptions = {
    integrationID: "3834baf8-78eb-42bf-b2b9-2e3bbd489865", // The ID of this integration.
    region: "eu-gb", // The region your integration is hosted in.
    serviceInstanceID: "dd784661-1c07-49d5-98c9-aeb1a4ae17ef", // The ID of your service instance.
    onLoad: function(instance) { instance.render(); }
};
setTimeout(function() {
    const t = document.createElement('script');
    t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
    document.head.appendChild(t);
});