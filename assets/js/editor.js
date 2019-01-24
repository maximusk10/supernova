document.addEventListener('DOMContentLoaded', () => {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/chaos");
    editor.session.setMode("ace/mode/html");
    editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        enableMultiselect: true,
        animatedScroll: true,
        fontSize: '20px',
    });
})