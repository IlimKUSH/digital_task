const squares = document.querySelector('.squares');

function showTooltip(event) {
  const square = event.target;
  const level = square.dataset.level;
  const date = new Date(square.dataset.date);

  const dateFormatter = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedDate = dateFormatter.format(date);
  const tooltip = document.createElement('div');
  tooltip.innerHTML = `<div>${level} contributors <br /> ${formattedDate}</div>`;
  tooltip.classList.add('tooltip');

  const tooltipOffset = 40;
  const squareRect = square.getBoundingClientRect();
  const topPosition = squareRect.top - tooltipOffset;

  tooltip.style.position = 'absolute';
  tooltip.style.top = `${topPosition}px`;
  tooltip.style.left = `${squareRect.left}px`;

  square.appendChild(tooltip);
}

function hideTooltip(event) {
  const square = event.target;
  const tooltip = square.querySelector('.tooltip');
  if (tooltip) {
    square.removeChild(tooltip);
  }
}

async function fetchData() {
  try {
    const response = await fetch('https://dpg.gg/test/calendar.json');
    const contributions = await response.json();

    for (const date in contributions) {
      const level = contributions[date];
      const square = document.createElement('li');
      square.dataset.level = level;
      square.dataset.date = date;
      square.addEventListener('mouseover', showTooltip);
      square.addEventListener('mouseout', hideTooltip);
      squares.appendChild(square);
    }
  } catch (error) {
    console.error(error);
  }
}

fetchData();
