// ==UserScript==
// @name         Время надписей в виде часов и минут. Только на русском языке.
// @namespace    idLast.com
// @version      0.1
// @description  Делает отображение времени надписей на idLast более понятным
// @author       vanstock | vanstock.lj.com
// @include      *idlast.com/*
// ==/UserScript==

(function() {
    // ловлю элемент в котором сидят надписи, мне будут нужны пять первых дивов
    var leftside_divs = document.querySelector('.float_leftside_block').getElementsByTagName('div');
    for(var i=0; i<5; i++) // там же пять последних добавленных значений
    {
        // удаляю все лишние пробелы
        var str = leftside_divs[i].innerHTML;
        while(str.search('  ')>-1){str=str.replace('  ',' ');}

        // время занудно ракладываю по частям, чтобы иметь возможность исключать нулевые варианты
        var old_time = str.split(' ')[3];
        var hours = Math.floor(old_time/60) + "ч.";
        var minutes = old_time%60 + "м.";
        if (hours == '0ч.') hours = '';
        if (minutes == '0м.') minutes = '';
        var new_time = hours + ' ' + minutes;

        // теперь заменяю старое значение на новое: делаю элемент, вставляю новый перед старым, удаляю старый (его индекс сдивнется)
        var change = document.createElement("div");
        change.innerHTML = leftside_divs[i].innerHTML.replace(old_time, new_time).replace('мин.','');
        leftside_divs[i].parentNode.insertBefore(change, leftside_divs[i]);
        leftside_divs[i].parentNode.removeChild(leftside_divs[i+1]);
    }
})();
