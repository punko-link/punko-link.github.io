(function () {
  'use strict';

  var METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  var TYPES = ['Dynamic', 'Static', 'Authorize'];
  var ROLES = ['Unauthorized', 'Writer'];

  var INITIAL_ROUTES = [
    { method: 'GET', path: '/articles', type: 'Dynamic', role: 'Unauthorized', authOn: false },
    { method: 'GET', path: '/articles/*', type: 'Static', role: 'Unauthorized', authOn: false },
    { method: 'POST', path: '/articles', type: 'Dynamic', role: 'Writer', authOn: true },
    { method: 'PUT', path: '/articles/*', type: 'Dynamic', role: 'Writer', authOn: true },
    { method: 'DELETE', path: '/articles/*', type: 'Dynamic', role: 'Writer', authOn: true }
  ];

  function buildOptions(select, values) {
    values.forEach(function (value) {
      var option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  function buildRow(route) {
    var tr = document.createElement('tr');
    tr.className = 'l7demo-row';

    // Method
    var tdMethod = document.createElement('td');
    tdMethod.setAttribute('data-label', 'Method');
    var methodSelect = document.createElement('select');
    methodSelect.className = 'l7demo-select l7demo-select-method';
    buildOptions(methodSelect, METHODS);
    methodSelect.value = route.method || 'GET';
    tdMethod.appendChild(methodSelect);
    tr.appendChild(tdMethod);

    // Path
    var tdPath = document.createElement('td');
    tdPath.className = 'l7demo-cell-path';
    tdPath.setAttribute('data-label', 'Path');
    var pathInput = document.createElement('input');
    pathInput.type = 'text';
    pathInput.className = 'l7demo-input l7demo-input-path';
    pathInput.value = route.path || '';
    pathInput.placeholder = '/path';
    tdPath.appendChild(pathInput);
    tr.appendChild(tdPath);

    // Type
    var tdType = document.createElement('td');
    tdType.setAttribute('data-label', 'Type');
    var typeSelect = document.createElement('select');
    typeSelect.className = 'l7demo-select l7demo-select-type';
    buildOptions(typeSelect, TYPES);
    typeSelect.value = route.type || TYPES[0];
    tdType.appendChild(typeSelect);
    tr.appendChild(tdType);

    // Access (role required)
    var tdAccess = document.createElement('td');
    tdAccess.setAttribute('data-label', 'Access');
    var accessSelect = document.createElement('select');
    accessSelect.className = 'l7demo-select l7demo-select-access';
    buildOptions(accessSelect, ROLES);
    accessSelect.value = route.role || ROLES[0];
    setAccessRole(accessSelect);
    tdAccess.appendChild(accessSelect);
    tr.appendChild(tdAccess);

    // Require auth toggle
    var tdAuth = document.createElement('td');
    tdAuth.setAttribute('data-label', 'Require Auth');
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'l7demo-toggle';
    toggle.setAttribute('aria-pressed', route.authOn ? 'true' : 'false');
    var track = document.createElement('span');
    track.className = 'l7demo-toggle-track';
    var thumb = document.createElement('span');
    thumb.className = 'l7demo-toggle-thumb';
    track.appendChild(thumb);
    var label = document.createElement('span');
    label.className = 'l7demo-toggle-label';
    toggle.appendChild(track);
    toggle.appendChild(label);
    setToggleState(toggle, label, !!route.authOn);
    tdAuth.appendChild(toggle);
    tr.appendChild(tdAuth);

    // Remove action
    var tdActions = document.createElement('td');
    tdActions.className = 'l7demo-cell-actions';
    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'l7demo-row-remove';
    removeBtn.setAttribute('aria-label', 'Remove route');
    removeBtn.textContent = '✕';
    tdActions.appendChild(removeBtn);
    tr.appendChild(tdActions);

    return tr;
  }

  function setToggleState(toggle, label, on) {
    toggle.dataset.state = on ? 'on' : 'off';
    toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    label.textContent = on ? 'AUTH ON' : 'AUTH OFF';
  }

  function setAccessRole(select) {
    select.dataset.role = select.value.toLowerCase();
  }

  function init() {
    var tbody = document.getElementById('l7demo-tbody');
    var addBtn = document.getElementById('l7demo-add-route');
    if (!tbody || !addBtn) return;

    INITIAL_ROUTES.forEach(function (route) {
      tbody.appendChild(buildRow(route));
    });

    addBtn.addEventListener('click', function () {
      tbody.appendChild(buildRow({ method: 'GET', path: '', type: TYPES[0], role: ROLES[0], authOn: false }));
    });

    tbody.addEventListener('change', function (event) {
      if (event.target.classList.contains('l7demo-select-access')) {
        setAccessRole(event.target);
      }
    });

    tbody.addEventListener('click', function (event) {
      var toggle = event.target.closest('.l7demo-toggle');
      if (toggle && tbody.contains(toggle)) {
        var label = toggle.querySelector('.l7demo-toggle-label');
        var isOn = toggle.dataset.state === 'on';
        setToggleState(toggle, label, !isOn);
        return;
      }

      var removeBtn = event.target.closest('.l7demo-row-remove');
      if (removeBtn && tbody.contains(removeBtn)) {
        var row = removeBtn.closest('tr');
        if (row) row.remove();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
