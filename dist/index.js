"use strict";
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b;
    async function polling(term) {
        return fetch(`http://127.0.0.1:8081/search?text=${term}`)
            .then(res => res.json())
            .then(data => data);
    }
    function append(result) {
        var _a;
        const node = document.createElement('li');
        node.innerHTML = `
      <li>${result}</li>
    `;
        (_a = document.getElementById('polling')) === null || _a === void 0 ? void 0 : _a.appendChild(node);
    }
    function addResults(result) {
        var _a;
        const node = document.createElement('li');
        node.innerHTML = `
      <li>${result}</li>
    `;
        (_a = document.querySelector('#results ul')) === null || _a === void 0 ? void 0 : _a.appendChild(node);
    }
    async function handleChange(event) {
        var _a;
        const value = (_a = event.target) === null || _a === void 0 ? void 0 : _a.value;
        const books = await polling(value.trim());
        const resultContainer = document.getElementById('polling');
        if (resultContainer)
            resultContainer.innerHTML = '';
        books.map(append);
    }
    async function handleSearch() {
        const inputEl = document.getElementById('search');
        if (inputEl && inputEl.value) {
            const books = await polling(inputEl.value.trim());
            const resultContainer = document.querySelector('#results ul');
            if (resultContainer)
                resultContainer.innerHTML = '';
            books.map(addResults);
        }
    }
    (_a = document.getElementById('search')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', handleChange);
    (_b = document
        .querySelector('button.search-icon')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', handleSearch);
});
