(function () {
  'use strict';

  var METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  var TYPES = ['Dynamic (controller)', 'Authorize (controller)', 'Static'];
  var TARGETS = ['api-pool-1', 'api-pool-2', 'admin-pool', 'static-assets'];

  var INITIAL_ROUTES = [
    { method: 'DELETE', path: '/admin/api/*', type: 'Dynamic (controller)', authOn: true },
    { method: 'GET', path: '/admin', type: 'Dynamic (controller)', authOn: false },
    { method: 'GET', path: '/admin/api/*', type: 'Dynamic (controller)', authOn: true },
    { method: 'POST', path: '/admin/api/*', type: 'Dynamic (controller)', authOn: true },
    { method: 'POST', path: '/admin/api/auth/login', type: 'Authorize (controller)', authOn: false },
    { method: 'PUT', path: '/admin/api/*', type: 'Dynamic (controller)', authOn: true }
  ];

  function buildOptions(select, values, placeholder) {
    if (placeholder) {
      var opt = document.createElement('option');
      opt.value = '';
      opt.textContent = placeholder;
      select.appendChild(opt);
    }
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
    var methodSelect = document.createElement('select');
    methodSelect.className = 'l7demo-select l7demo-select-method';
    buildOptions(methodSelect, METHODS, null);
    methodSelect.value = route.method || 'GET';
    tdMethod.appendChild(methodSelect);
    tr.appendChild(tdMethod);

    // Path
    var tdPath = document.createElement('td');
    tdPath.className = 'l7demo-cell-path';
    var pathInput = document.createElement('input');
    pathInput.type = 'text';
    pathInput.className = 'l7demo-input l7demo-input-path';
    pathInput.value = route.path || '';
    pathInput.placeholder = '/path';
    tdPath.appendChild(pathInput);
    tr.appendChild(tdPath);

    // Type
    var tdType = document.createElement('td');
    var typeSelect = document.createElement('select');
    typeSelect.className = 'l7demo-select l7demo-select-type';
    buildOptions(typeSelect, TYPES, null);
    typeSelect.value = route.type || TYPES[0];
    tdType.appendChild(typeSelect);
    tr.appendChild(tdType);

    // Target
    var tdTarget = document.createElement('td');
    tdTarget.className = 'l7demo-cell-target';
    var targetSelect = document.createElement('select');
    targetSelect.className = 'l7demo-select l7demo-select-target';
    buildOptions(targetSelect, TARGETS, 'Select pool…');
    targetSelect.value = '';
    tdTarget.appendChild(targetSelect);
    tr.appendChild(tdTarget);

    // Roles allowed
    var tdRoles = document.createElement('td');
    var roleChip = document.createElement('span');
    roleChip.className = 'l7demo-role-chip';
    roleChip.textContent = 'admin';
    tdRoles.appendChild(roleChip);
    tr.appendChild(tdRoles);

    // Require auth toggle
    var tdAuth = document.createElement('td');
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

    // IP blacklist
    var tdBlacklist = document.createElement('td');
    tdBlacklist.className = 'l7demo-cell-ip';
    var blacklistInput = document.createElement('input');
    blacklistInput.type = 'text';
    blacklistInput.className = 'l7demo-input';
    blacklistInput.placeholder = 'comma-separated IPs';
    tdBlacklist.appendChild(blacklistInput);
    tr.appendChild(tdBlacklist);

    // IP whitelist
    var tdWhitelist = document.createElement('td');
    tdWhitelist.className = 'l7demo-cell-ip';
    var whitelistInput = document.createElement('input');
    whitelistInput.type = 'text';
    whitelistInput.className = 'l7demo-input';
    whitelistInput.placeholder = 'comma-separated IPs';
    tdWhitelist.appendChild(whitelistInput);
    tr.appendChild(tdWhitelist);

    // Remove action
    var tdActions = document.createElement('td');
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

  function init() {
    var tbody = document.getElementById('l7demo-tbody');
    var addBtn = document.getElementById('l7demo-add-route');
    if (!tbody || !addBtn) return;

    INITIAL_ROUTES.forEach(function (route) {
      tbody.appendChild(buildRow(route));
    });

    addBtn.addEventListener('click', function () {
      tbody.appendChild(buildRow({ method: 'GET', path: '', type: TYPES[0], authOn: false }));
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
