// ==UserScript==
// @name         Отображение длительности висения «надписей» в форме часов и минут. 
// @namespace    idLast.com
// @version      1.2
// @description  Делает отображение длительности висения «надписей» на idLast более понятным. Только на русском языке.
// @author       vanstock | vanstock.lj.com
// @include      *idlast.com/*
// ==/UserScript==

// Костыли, они такие костыли ;)
(function() {
    // ловлю элемент в котором сидят надписи, мне будут нужны пять первых дивов
    var leftside_divs = document.querySelector('.float_leftside_block').getElementsByTagName('div');
    for(var i=0; i<5; i++) // там же пять последних добавленных значений
    {
        // удаляю все лишние пробелы
        var str = leftside_divs[i].innerHTML;
        while(str.search('  ')>-1){str=str.replace('  ',' ');}

        // занудно ракладываю время по частям, чтобы исключать нулевые варианты
        var old_time = str.split(' ')[3];
        var hours = Math.floor(old_time/60) + " ч.";
        var minutes = old_time%60 + " мин.";
        if (hours == '0 ч.') hours = '';
        if (minutes == '0 мин.') minutes = '';
        var new_time = hours + ' ' + minutes;
        if (new_time = ' ') new_time = "моментальные!";

        // теперь заменяю старое значение на новое: делаю элемент, вставляю новый перед старым, удаляю старый (его индекс сдивнется)
        var change = document.createElement("div");
        change.innerHTML = leftside_divs[i].innerHTML.replace(old_time+' мин.', new_time);
        leftside_divs[i].parentNode.insertBefore(change, leftside_divs[i]);
        leftside_divs[i].parentNode.removeChild(leftside_divs[i+1]);
    }
})();
