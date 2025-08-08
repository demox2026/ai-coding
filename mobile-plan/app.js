const DEFAULT_DATA = {
  basic_plan_info: { departure_city: "北京", destination_city: "青岛" },
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
    hotel: { price_limit: 500, brand: "希尔顿" },
    concert: { singer_name: "林俊杰" },
    city_event: { city: "青岛" },
  },
  reminder_schedule: "WEEKEND",
};

const sheet = document.getElementById("actionSheet");
const mask = document.getElementById("sheetMask");
const openBtn = document.getElementById("openSheetBtn");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");
const form = document.getElementById("trackerForm");
const resultBox = document.getElementById("resultBox");
const resultJson = document.getElementById("resultJson");
const toastEl = document.getElementById("toast");

function showSheet() {
  mask.classList.add("show");
  sheet.classList.add("show");
  mask.setAttribute("aria-hidden", "false");
}
function hideSheet() {
  sheet.classList.remove("show");
  mask.classList.remove("show");
  mask.setAttribute("aria-hidden", "true");
}

openBtn.addEventListener("click", () => {
  applyDefaults(DEFAULT_DATA);
  showSheet();
});
mask.addEventListener("click", hideSheet);
cancelBtn.addEventListener("click", hideSheet);

// toggle panels when checkboxes change
form.addEventListener("change", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLInputElement)) return;
  if (target.type === "checkbox") {
    const name = target.name; // e.g. check_flight
    const key = name.replace("check_", "");
    const panel = form.querySelector(`.panel[data-panel="${key}"]`);
    if (panel) panel.hidden = !target.checked;
  }
});

function applyDefaults(data) {
  // capability checkboxes
  [
    "check_flight",
    "check_train",
    "check_hotel",
    "check_concert",
    "check_city_event",
  ].forEach((k) => {
    const input = form.querySelector(`input[name="${k}"]`);
    if (input) {
      input.checked = Boolean(data.capability_requirements[k]);
      const key = k.replace("check_", "");
      const panel = form.querySelector(`.panel[data-panel="${key}"]`);
      if (panel) panel.hidden = !input.checked;
    }
  });

  // text & number fields
  const map = {
    "flight.departure_city": data.basic_plan_info.departure_city,
    "flight.destination_city": data.basic_plan_info.destination_city,
    "flight.price_limit": data.preset_params.flight.price_limit,
    "train.price_limit": data.preset_params.train.price_limit,
    "hotel.price_limit": data.preset_params.hotel.price_limit,
    "hotel.brand": data.preset_params.hotel.brand,
    "concert.singer_name": data.preset_params.concert.singer_name,
    "city_event.city": data.preset_params.city_event.city,
  };
  Object.entries(map).forEach(([name, value]) => {
    const input = form.querySelector(`input[name="${name}"]`);
    if (input) input.value = value;
  });

  // reminder
  const radios = form.querySelectorAll('input[name="reminder_schedule"]');
  radios.forEach((r) => {
    r.checked = r.value === data.reminder_schedule;
  });
}

function showToast(text) {
  toastEl.textContent = text;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 1800);
}

function collectForm() {
  const data = {
    basic_plan_info: {
      departure_city: form.querySelector('input[name="flight.departure_city"]').value || DEFAULT_DATA.basic_plan_info.departure_city,
      destination_city: form.querySelector('input[name="flight.destination_city"]').value || DEFAULT_DATA.basic_plan_info.destination_city,
    },
    capability_requirements: {
      check_flight: form.querySelector('input[name="check_flight"]').checked,
      check_train: form.querySelector('input[name="check_train"]').checked,
      check_hotel: form.querySelector('input[name="check_hotel"]').checked,
      check_concert: form.querySelector('input[name="check_concert"]').checked,
      check_city_event: form.querySelector('input[name="check_city_event"]').checked,
    },
    preset_params: {
      flight: {
        price_limit: Number(form.querySelector('input[name="flight.price_limit"]').value || DEFAULT_DATA.preset_params.flight.price_limit),
      },
      train: {
        price_limit: Number(form.querySelector('input[name="train.price_limit"]').value || DEFAULT_DATA.preset_params.train.price_limit),
      },
      hotel: {
        price_limit: Number(form.querySelector('input[name="hotel.price_limit"]').value || DEFAULT_DATA.preset_params.hotel.price_limit),
        brand: form.querySelector('input[name="hotel.brand"]').value || DEFAULT_DATA.preset_params.hotel.brand,
      },
      concert: { singer_name: form.querySelector('input[name="concert.singer_name"]').value || DEFAULT_DATA.preset_params.concert.singer_name },
      city_event: { city: form.querySelector('input[name="city_event.city"]').value || DEFAULT_DATA.preset_params.city_event.city },
    },
    reminder_schedule: form.querySelector('input[name="reminder_schedule"]:checked')?.value || DEFAULT_DATA.reminder_schedule,
  };
  return data;
}

confirmBtn.addEventListener("click", () => {
  const data = collectForm();
  // fake create
  hideSheet();
  showToast("已创建追踪任务");
  resultBox.hidden = false;
  resultJson.textContent = JSON.stringify(data, null, 2);
});

// Accessibility: ESC to close
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideSheet();
});