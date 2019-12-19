'use strict';

let money, time;                                    // Создаём переменные в глобальной области

function start() {                                                  // Функция с вопросами пользователю
    money = +prompt("Ваш бюджет на месяц?", '');
    time = prompt("Введите дату в формате YYYY-MM-DD", "");

    // цикл, при котором вопросы пользователю будут повторяться до тех пор, пока он не даст корректные ответы. Мы проверяем переменную money.
    while(isNaN(money) || money == "" || money == null) { // команда isNaN возвращает true тогда, когда в ответ (в переменную maney) попадают  НЕ цифры; то есть написал юзер в ответ  целую строку или буквы. Также мы проверяем нашу переменную maney на предмет пустой строки (money == ""); т.е. нам не нужно, чтобы строка осталась пустой. Далее мы проверяем (money == null), чтобы пользователь НЕ мог нажать кнопку отмены. Таким образом, если одно из условий выполнится (т.е. будет введена НЕкорректная инф-я), цикл будет повторяться, пока юзер не даст нужные ответы.
        money = +prompt("Ваш бюджет на месяц?", ""); // здесь мы снова размещаем тот же вопрос, чтобы, если понадобится, он мог повторяться.
    } 
} 
start();                                                    // Вызов функции

let appData = {                                                 // Создаём объект
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function() {                            // создаём метод объекта обязательных расходов.
        for (let i = 0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
                b = prompt("Во сколько обойдется?", "");
        
            
            if ( typeof(a)=== 'string' && typeof(a) != null && typeof(b) != null        // содаём проверку ответов(проверяем переменные a и b на тип данных), задаём для них условия, невыполнение которых будет откатывать цикл назад, и вопросы будут повторяться, пока не будет дан корректный ответ.
                && a != "" && b != "" && a.length < 50) {
                console.log("done");                                // done - условная фраза, кот. выводится в консоль, как знак, что проверка ответов прошла.
                appData.expenses[a] = b;                            // присваиваем свойству expenses новое значение.
            } else {
                i--;
                console.log("done"); 
            } 
        }
    },
    detectDayBudget: function() {                                   // создаём метод объекта рассчёта дневного бюджета
        appData.moneyPerDay =  (appData.budget / 30).toFixed();
        alert("Бюджет на 1 день составляет " + appData.moneyPerDay + " руб.");
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay > 2000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log("Произошла ошибка");
        }
    }, 
    checkSavings: function() {                                  // создаём метод объекта рассчёта дохода со сбережений
        if (appData.savings == true)                       /* проверка условиями - действительно ли он стоит в true - только в таком случае у нас будут выполняться какие-то действия */ {
            let save = +prompt("Какова сумма накоплений?"),
                percent = +prompt("Под какой процент?");
    
                
                appData.monthIncome = save/100/12*percent;                  // создаём новое свойство (переменную) monthIncome (доход или прибыль за месяц) нашего объекта appData, которому присваиваем значение на основании тех данных, кот. ввёл пользователь.
                alert("Доход с Вашего депозита в месяц : " + appData.monthIncome);           // и выводим результат в окно-оповещение для юзера, куда копируем нашу новую переменную (свойство) appData.monthIncome.
        }
    },
    chooseOptExpenses: function() {                // создаём метод объекта необязательных расходов
        for (let i = 1; i <= 3; i++) {
            let questionOptExpenses = prompt("Статья необязательных расходов?");
            appData.optionalExpenses[i] = questionOptExpenses;
            console.log(appData.optionalExpenses);
        }
    },
    chooseIncome: function () {
            let items = prompt('Что принесёт дополнительный доход? (Перечислите через запятую)', '');
            
            if (typeof(items) != 'string' || items == '' || typeof(items) != null) {
                console.log("Вы ввели некорректные данные или не ввели их вовсе");
            } else {
                appData.income = items.split(', ');
                appData.income.push(prompt('Может, что-то ещё?'));
                appData.income.sort();
            }
            
            appData.income.forEach (function (itemmassive, i) {
                alert("Способы доп. заработка: " + (i=1) + " - " + itemmassive);
            });
    }
};


for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}
