document.addEventListener('DOMContentLoaded', () => {
  async function polling(term: string): Promise<string[]> {
    return fetch(`http://127.0.0.1:8081/search?text=${term}`)
      .then(res => res.json())
      .then(data => data);
  }

  function append(result: string) {
    const node = document.createElement('li');
    node.innerHTML = `
      <li>${result}</li>
    `;
    document.getElementById('polling')?.appendChild(node);
  }

  function addResults(result: string) {
    const node = document.createElement('li');
    node.innerHTML = `
      <li>${result}</li>
    `;
    document.querySelector('#results ul')?.appendChild(node);
  }

  async function handleChange(event: Event) {
    const value = (event.target as HTMLInputElement)?.value;

    const books = await polling(value.trim());

    const resultContainer = document.getElementById('polling');

    if (resultContainer) resultContainer.innerHTML = '';

    books.map(append);
  }

  async function handleSearch() {
    const inputEl = document.getElementById('search') as HTMLInputElement;

    if (inputEl && inputEl.value) {
      const books = await polling(inputEl.value.trim());

      const resultContainer = document.querySelector('#results ul');

      if (resultContainer) resultContainer.innerHTML = '';

      books.map(addResults);
    }
  }

  document.getElementById('search')?.addEventListener('input', handleChange);
  document
    .querySelector('button.search-icon')
    ?.addEventListener('click', handleSearch);
});
