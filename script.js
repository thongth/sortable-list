const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
  ];

  const listItems = [];

  let dragStartIndex;

  createList();

  function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
  }
  
  function dragEnter(e) {
    console.log('in');
    this.closest('li').classList.add('over');
  }
  
  function dragLeave() {
    console.log('out');
    this.closest('li').classList.remove('over');
  }
  
  function dragOver(e) {
    e.preventDefault();
  }
  
  function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
  }

  function swapItems(fromIndex, toIndex) {
      const itemOne = listItems[fromIndex].querySelector('.draggable');
      const itemTwo = listItems[toIndex].querySelector('.draggable');

      listItems[fromIndex].appendChild(itemTwo);
      listItems[toIndex].appendChild(itemOne);
  }

  function createList() {
      [...richestPeople]
        .map(a => ({ value: a, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
              <p class="person-name">${person}</p>
              <i class="fas fa-grip-lines"></i>
            </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });

        addEventListeners();
  }

  function checkOrder() {
      listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[index]) {
            listItem.classList.remove('right');
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
      });
  }

  function addEventListeners() {
      const draggables = document.querySelectorAll('.draggable');
      const dragListItems = document.querySelectorAll('.draggable-list li');

      draggables.forEach(draggable => {
          draggable.addEventListener('dragstart', dragStart);
      });

      dragListItems.forEach(item => {
          item.addEventListener('dragover', dragOver);
          item.addEventListener('dragenter', dragEnter);
          item.addEventListener('dragleave', dragLeave);
          item.addEventListener('drop', dragDrop);

      })
  }

  check.addEventListener('click', checkOrder);

  