const preset = {
  basic_plan_info: { departure_city: '北京', destination_city: '青岛' },
  capability_requirements: {
    check_flight: true,
    check_train: true,
    check_hotel: true,
    check_concert: true,
    check_city_event: true,
  },
  preset_params: {
    flight: { price_limit: 800 },
    train: { price_limit: 300 },
    hotel: { price_limit: 500, brand: '希尔顿' },
    concert: { singer_name: '林俊杰' },
    city_event: { city: '青岛' },
  },
  reminder_schedule: 'WEEKEND',
};

const $ = (sel) => document.querySelector(sel);

function hydrateBasicPlan() {
  $('#departureCity').textContent = preset.basic_plan_info.departure_city;
  $('#destinationCity').textContent = preset.basic_plan_info.destination_city;
  $('#reminderSchedule').textContent = preset.reminder_schedule === 'DAILY' ? '每天' : '周末';
}

function hydrateSheetDefaults() {
  // capability checkboxes
  $('#capFlight').checked = !!preset.capability_requirements.check_flight;
  $('#capTrain').checked = !!preset.capability_requirements.check_train;
  $('#capHotel').checked = !!preset.capability_requirements.check_hotel;
  $('#capConcert').checked = !!preset.capability_requirements.check_concert;
  $('#capCityEvent').checked = !!preset.capability_requirements.check_city_event;

  // preset params
  $('#flightPrice').value = String(preset.preset_params.flight.price_limit ?? '');
  $('#trainPrice').value = String(preset.preset_params.train.price_limit ?? '');
  $('#hotelPrice').value = String(preset.preset_params.hotel.price_limit ?? '');
  $('#hotelBrand').value = String(preset.preset_params.hotel.brand ?? '');
  $('#concertSinger').value = String(preset.preset_params.concert.singer_name ?? '');
  $('#eventCity').value = String(preset.preset_params.city_event.city ?? '');
}

function toggleParamsVisibility() {
  const pairs = [
    ['#capFlight', '[data-for="capFlight"]'],
    ['#capTrain', '[data-for="capTrain"]'],
    ['#capHotel', '[data-for="capHotel"]'],
    ['#capConcert', '[data-for="capConcert"]'],
    ['#capCityEvent', '[data-for="capCityEvent"]'],
  ];
  pairs.forEach(([checkboxSel, panelSel]) => {
    const enabled = $(checkboxSel).checked;
    const panel = $(panelSel);
    panel.style.display = enabled ? 'grid' : 'none';
  });
}

function openSheet() {
  $('#sheetMask').classList.remove('hidden');
  const sheet = $('#actionSheet');
  sheet.classList.remove('hidden');
  requestAnimationFrame(() => sheet.classList.add('show'));
}
function closeSheet() {
  $('#sheetMask').classList.add('hidden');
  const sheet = $('#actionSheet');
  sheet.classList.remove('show');
  setTimeout(() => sheet.classList.add('hidden'), 250);
}

function resetSheet() {
  hydrateSheetDefaults();
  toggleParamsVisibility();
}

function collectTaskPayload() {
  const cap = {
    flight: $('#capFlight').checked,
    train: $('#capTrain').checked,
    hotel: $('#capHotel').checked,
    concert: $('#capConcert').checked,
    city_event: $('#capCityEvent').checked,
  };

  const payload = {
    basic_plan_info: preset.basic_plan_info,
    reminder_schedule: preset.reminder_schedule,
    tasks: []
  };

  if (cap.flight) {
    const priceLimit = Number($('#flightPrice').value || preset.preset_params.flight.price_limit);
    payload.tasks.push({ type: 'flight', params: { price_limit: priceLimit } });
  }
  if (cap.train) {
    const priceLimit = Number($('#trainPrice').value || preset.preset_params.train.price_limit);
    payload.tasks.push({ type: 'train', params: { price_limit: priceLimit } });
  }
  if (cap.hotel) {
    const priceLimit = Number($('#hotelPrice').value || preset.preset_params.hotel.price_limit);
    const brand = ($('#hotelBrand').value || preset.preset_params.hotel.brand).trim();
    payload.tasks.push({ type: 'hotel', params: { price_limit: priceLimit, brand } });
  }
  if (cap.concert) {
    const singer = ($('#concertSinger').value || preset.preset_params.concert.singer_name).trim();
    payload.tasks.push({ type: 'concert', params: { singer_name: singer } });
  }
  if (cap.city_event) {
    const city = ($('#eventCity').value || preset.preset_params.city_event.city).trim();
    payload.tasks.push({ type: 'city_event', params: { city } });
  }
  return payload;
}

function onConfirm() {
  const payload = collectTaskPayload();
  localStorage.setItem('tracking_tasks', JSON.stringify(payload));
  closeSheet();
  // Simple feedback
  const msg = `已创建 ${payload.tasks.length} 个追踪任务`; 
  alert(msg);
}

function main() {
  hydrateBasicPlan();
  hydrateSheetDefaults();
  toggleParamsVisibility();

  $('#openSheetBtn').addEventListener('click', openSheet);
  $('#closeSheetBtn').addEventListener('click', closeSheet);
  $('#sheetMask').addEventListener('click', closeSheet);

  ['#capFlight','#capTrain','#capHotel','#capConcert','#capCityEvent']
    .forEach(sel => $(sel).addEventListener('change', toggleParamsVisibility));

  $('#resetBtn').addEventListener('click', resetSheet);
  $('#confirmBtn').addEventListener('click', onConfirm);
}

window.addEventListener('DOMContentLoaded', main);