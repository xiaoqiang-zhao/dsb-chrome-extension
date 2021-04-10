// document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // const checkType = $('[value="message"]')[0];
        const dzbInput = document.getElementById('dzb-input');
        // 方案一:
        // chrome.runtime.sendMessage({
        //     name: 'login-step-2',
        //     position: {
        //         x: getElementLeft(dzbInput) + 3,
        //         y: getElementTop(dzbInput) + 3
        //     }
        // });
        // 方案二:
        dzbInput.setAttribute('checked', 'checked');
    }, 2000);
// });

function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null){
    　　actualLeft += current.offsetLeft;
    　　current = current.offsetParent;
    }

    return actualLeft;
}
    
function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null){
    　　actualTop += current.offsetTop;
    　　current = current.offsetParent;
    }

    return actualTop;
}
