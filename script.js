const priceSkin = document.querySelectorAll('.price-skin');
const drop = document.querySelectorAll('.drop');
const priceCaseHtml = document.querySelector('.price-case');
const openings = document.querySelector('.total-open');
const profitHtml = document.querySelector('span');
const openCaseHtml = document.querySelector('.open');
const dropCount = document.querySelectorAll('.drop-count input');

let arr = [];
let priceCase = 0;
let totalOpenings = 0;
let sum = 0;

!localStorage.skins
    ? (arr = [
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
          { price: null, chance: null },
      ])
    : (arr = JSON.parse(localStorage.getItem('skins')));

const updateStorage = () => {
    localStorage.setItem('skins', JSON.stringify(arr));
};

priceSkin.forEach((item, i) => {
    item.value = arr[i].price;
});
drop.forEach((item, i) => {
    item.value = arr[i].chance;
});

for (let i = 0; i < 20; i++) {
    priceSkin[i].addEventListener('input', () => {
        arr[i].price = Number(priceSkin[i].value);
        updateStorage();
    });
    drop[i].addEventListener('input', () => {
        arr[i].chance = Number(drop[i].value);
        updateStorage();
    });
}

priceCaseHtml.addEventListener('input', () => {
    priceCase = Number(priceCaseHtml.value);
});
openings.addEventListener('input', () => {
    totalOpenings = Number(openings.value);
});

const openCase = (root) => {
    const sum = root.reduce((acc, curr) => acc + curr.chance, 0);
    const n = Math.floor(Math.random() * sum);
    let index = 0;
    for (let s = root[0].chance; s <= n; s += root[index].chance) {
        index++;
    }
    return root[index];
};

let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

openCaseHtml.addEventListener('click', () => {
    for (let i = 0; i < counts.length; i++) {
        counts[i] = 0;
    }
    for (let i = 0; i < counts.length; i++) {
        dropCount[i].valueAsNumber = 0;
    }
    profitHtml.innerHTML = 0;
    sum = 0;

    for (let i = 0; i < totalOpenings; i++) {
        let getIndex = openCase(arr);
        for (let i = 0; i < counts.length; i++) {
            if (getIndex === arr[i]) {
                counts[i] += 1 * arr[i].price;
                dropCount[i].valueAsNumber += 1;
            }
        }
    }

    for (let i = 0; i < counts.length; i++) {
        sum += counts[i];
    }

    let totalOpenPrice = priceCase * totalOpenings;
    profitHtml.innerHTML = totalOpenPrice - sum;
});
