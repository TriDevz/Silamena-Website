function parse(input) {
    let htmlcode = input;
    htmlcode = htmlcode.replace(/<->/g, '↔');                      // arrows
    htmlcode = htmlcode.replace(/->/g, '→');                       // right arrow
    htmlcode = htmlcode.replace(/<-/g, '←');                       // left arrow
    htmlcode = htmlcode.replace(/\*([^*]+)\*/g, '<b>$1</b>');      // bold
    htmlcode = htmlcode.replace(/_([^_]+)_/g, '<i>$1</i>');        // italic
    htmlcode = htmlcode.replace(/<br>- /g, '<br>• ');              // \n- 
    htmlcode = htmlcode.replace(/^- */, "• ");                     // - at start
    htmlcode = htmlcode.replace(/@(\w+)/g, "<a href='$1'>$1</a>"); // @[word] -> a word

    
    return htmlcode;
}

function synonymsParse(input) {
    const words = input.split(", ");
    const anchorTags = [];
    words.forEach(word => {
        const anchor = document.createElement("a");
        anchor.href = word.trim();
        anchor.textContent = word.trim();
        anchorTags.push(anchor.outerHTML);
    });
    return " " + anchorTags.join(", ");
}