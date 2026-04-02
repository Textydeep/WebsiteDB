(function () {
  'use strict';

  var buttons = document.querySelectorAll('.tab-btn');
  var sections = document.querySelectorAll('.tab-content');

  function activate(tabId) {
    buttons.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    sections.forEach(function (sec) {
      sec.classList.toggle('active', sec.id === tabId);
    });
    // Keep URL fragment in sync so the page is bookmarkable
    history.replaceState(null, '', '#' + tabId);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activate(btn.dataset.tab);
    });
  });

  // On load, honour the URL fragment if present
  var hash = window.location.hash.replace('#', '');
  var validTabs = Array.from(buttons).map(function (b) { return b.dataset.tab; });
  if (hash && validTabs.indexOf(hash) !== -1) {
    activate(hash);
  }

  // Contact form submit handler
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var valid = true;

      // Validate each required field
      ['name', 'email', 'message'].forEach(function (fieldId) {
        var field = document.getElementById(fieldId);
        var errorEl = document.getElementById(fieldId + '-error');
        if (!field.value.trim()) {
          errorEl.textContent = 'This field is required.';
          field.setAttribute('aria-invalid', 'true');
          valid = false;
        } else if (fieldId === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
          errorEl.textContent = 'Please enter a valid email address.';
          field.setAttribute('aria-invalid', 'true');
          valid = false;
        } else {
          errorEl.textContent = '';
          field.removeAttribute('aria-invalid');
        }
      });

      if (!valid) return;

      var status = document.getElementById('form-status');
      status.textContent = 'Thank you! Your message has been received.';
      form.reset();
      // Clear any leftover error states after reset
      ['name', 'email', 'message'].forEach(function (fieldId) {
        document.getElementById(fieldId + '-error').textContent = '';
        document.getElementById(fieldId).removeAttribute('aria-invalid');
      });
    });
  }
}());
