// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transaction = exports.transactionType = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var transactionType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE"
};
exports.transactionType = transactionType;

var _secret = /*#__PURE__*/new WeakMap();

var Transaction = /*#__PURE__*/function () {
  function Transaction(type, value) {
    _classCallCheck(this, Transaction);

    _secret.set(this, {
      writable: true,
      value: "adsad".concat(Math.random() * 100)
    });

    if (typeof value !== "number" || isNaN(value)) throw new TypeError("value must be number");
    if (!(type in transactionType)) throw new Error("type must be INCOME or EXPENSE only");
    this._type = type;
    this._value = value;
    this.id = "".concat(type, "-").concat(value, "-").concat(_classPrivateFieldGet(this, _secret));
    this.timestamp = Date.now();
  }

  _createClass(Transaction, [{
    key: "saveTransactionInLS",
    value: function saveTransactionInLS() {
      var list = localStorage.getItem("transactions");
      var toSave = {
        type: this._type,
        value: this._value,
        time: this.timestamp,
        id: this.id
      };

      if (list) {
        list = JSON.parse(list);
        list.push(toSave);
      } else {
        list = [toSave];
      }

      localStorage.setItem("transactions", JSON.stringify(list));
    }
  }]);

  return Transaction;
}();

exports.Transaction = Transaction;
;
},{}],"src/js/Views/AddTransactionView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AddTransactionView = /*#__PURE__*/function () {
  function AddTransactionView() {
    _classCallCheck(this, AddTransactionView);

    _defineProperty(this, "_form", document.querySelector(".add_transaction_form"));

    _defineProperty(this, "_amount", this._form.querySelector(".amount"));

    _defineProperty(this, "_type", this._form.querySelector(".transaction_type"));
  }

  _createClass(AddTransactionView, [{
    key: "addSubmitHandler",
    value: function addSubmitHandler(handler) {
      var self = this;

      this._form.addEventListener("submit", function (e) {
        handler(e);
        self.clearForm();
        var ev = new CustomEvent("StorageChange", {
          detail: {
            type: self._type.value
          },
          bubbles: true
        });

        self._amount.dispatchEvent(ev);

        console.log(ev);
      });
    }
  }, {
    key: "clearForm",
    value: function clearForm() {
      this._amount.value = "";
    }
  }, {
    key: "amount",
    get: function get() {
      return parseFloat(this._amount.value);
    }
  }, {
    key: "type",
    get: function get() {
      return this._type.value;
    }
  }]);

  return AddTransactionView;
}();

var _default = new AddTransactionView();

exports.default = _default;
},{}],"src/js/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CURRENCY_UNIT = void 0;
var CURRENCY_UNIT = "Rs";
exports.CURRENCY_UNIT = CURRENCY_UNIT;
},{}],"src/js/Views/ShowBalanceView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("../config");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _generateHTMLString = /*#__PURE__*/new WeakSet();

var ShowBalanceView = /*#__PURE__*/function () {
  function ShowBalanceView() {
    _classCallCheck(this, ShowBalanceView);

    _generateHTMLString.add(this);

    _defineProperty(this, "_parentElement", document.querySelector(".add_transaction_container"));

    _defineProperty(this, "_container", this._parentElement.querySelector(".balance_container"));
  }

  _createClass(ShowBalanceView, [{
    key: "render",
    value: function render(data) {
      this.data = data;
      var balance = this.getTotalBalance();
      console.log("balance is ", this.balance);
      this._container.innerHTML = _classPrivateMethodGet(this, _generateHTMLString, _generateHTMLString2).call(this);
    }
  }, {
    key: "addRenderListnerHandler",
    value: function addRenderListnerHandler(handler) {
      this._parentElement.addEventListener("StorageChange", handler.bind(this));
    }
  }, {
    key: "getTotalBalance",
    value: function getTotalBalance() {
      var totalIncome = 0;
      this.data.income.forEach(function (inc) {
        totalIncome += inc._value;
      });
      var totalExpense = 0;
      this.data.expense.forEach(function (exp) {
        totalExpense += exp._value;
      });
      this.balance = totalIncome - totalExpense;
    }
  }, {
    key: "getFormatedBalance",
    value: function getFormatedBalance() {
      return Number(parseFloat(this.balance).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2
      });
    }
  }]);

  return ShowBalanceView;
}();

function _generateHTMLString2() {
  return "\n        <div style=\"display:flex;flex-direction:column;align-items:center;\"> \n            <h5>Your Balance</h5>\n           <div class=\"balance bold ".concat(this.balance > 0 ? "green" : "red", "\">\n             ").concat(_config.CURRENCY_UNIT, " ").concat(this.getFormatedBalance(), "\n           </div>\n        </div>\n        ");
}

;

var _default = new ShowBalanceView();

exports.default = _default;
},{"../config":"src/js/config.js"}],"src/js/Views/ExpenseTrackerView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("../config");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _generateHTMLString = /*#__PURE__*/new WeakSet();

var _getDateByTimeStamp = /*#__PURE__*/new WeakSet();

var ExpenseTrackerView = /*#__PURE__*/function () {
  function ExpenseTrackerView() {
    _classCallCheck(this, ExpenseTrackerView);

    _getDateByTimeStamp.add(this);

    _generateHTMLString.add(this);

    _defineProperty(this, "_container", document.querySelector(".expenses_container"));

    _defineProperty(this, "_body_container", document.querySelector(".body_container"));
  }

  _createClass(ExpenseTrackerView, [{
    key: "render",
    value: function render(data) {
      this.data = data;

      var html = _classPrivateMethodGet(this, _generateHTMLString, _generateHTMLString2).call(this);

      this._container.innerHTML = html;
    }
  }, {
    key: "addRenderHandler",
    value: function addRenderHandler(handler) {
      this._body_container.addEventListener("StorageChange", handler.bind(this));
    }
  }]);

  return ExpenseTrackerView;
}();

function _generateHTMLString2() {
  var _this = this;

  var html = "<div style=\"overflow=auto;width=100%;height=100%\">";

  if (Array.isArray(this.data)) {
    this.data.forEach(function (el) {
      html += "\n                <div class=\"card transaction_card\" style=\"display:flex; justify-content:space-between\">\n                <div class=\"red\" style=\"font-weight:bolder;\"> - ".concat(el._value, " ").concat(_config.CURRENCY_UNIT, "</div>\n                <div>").concat(_classPrivateMethodGet(_this, _getDateByTimeStamp, _getDateByTimeStamp2).call(_this, el.timestamp), "</div>\n               </div>\n                ");
    });
  }

  html += '</div>';
  return html;
}

function _getDateByTimeStamp2(timestamp) {
  var date = new Date(timestamp);
  return date.toDateString();
}

;

var _default = new ExpenseTrackerView();

exports.default = _default;
},{"../config":"src/js/config.js"}],"src/js/Views/IncomeTrackerView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("../config");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _generateHTMLString = /*#__PURE__*/new WeakSet();

var _getDateByTimeStamp = /*#__PURE__*/new WeakSet();

var IncomeTrackerView = /*#__PURE__*/function () {
  function IncomeTrackerView() {
    _classCallCheck(this, IncomeTrackerView);

    _getDateByTimeStamp.add(this);

    _generateHTMLString.add(this);

    _defineProperty(this, "_container", document.querySelector(".income_container"));

    _defineProperty(this, "_body_container", document.querySelector(".body_container"));
  }

  _createClass(IncomeTrackerView, [{
    key: "render",
    value: function render(data) {
      this.data = data;

      var html = _classPrivateMethodGet(this, _generateHTMLString, _generateHTMLString2).call(this);

      this._container.innerHTML = html;
    }
  }, {
    key: "addRenderHandler",
    value: function addRenderHandler(handler) {
      this._body_container.addEventListener("StorageChange", handler.bind(this));
    }
  }]);

  return IncomeTrackerView;
}();

function _generateHTMLString2() {
  var _this = this;

  var html = "<div style=\"overflow=auto;width=100%;height=100%\">";

  if (Array.isArray(this.data)) {
    this.data.forEach(function (el) {
      html += "\n                <div class=\"card transaction_card\" style=\"display:flex; justify-content:space-between\">\n                 <div class=\"green\" style=\"font-weight:bolder;\"> + ".concat(el._value, " ").concat(_config.CURRENCY_UNIT, "</div>\n                 <div>").concat(_classPrivateMethodGet(_this, _getDateByTimeStamp, _getDateByTimeStamp2).call(_this, el.timestamp), "</div>\n                </div>\n                ");
    });
  }

  html += '</div>';
  return html;
}

function _getDateByTimeStamp2(timestamp) {
  var date = new Date(timestamp);
  return date.toDateString();
}

;

var _default = new IncomeTrackerView();

exports.default = _default;
},{"../config":"src/js/config.js"}],"src/js/Views/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AddTransactionView", {
  enumerable: true,
  get: function () {
    return _AddTransactionView.default;
  }
});
Object.defineProperty(exports, "ShowBalanceView", {
  enumerable: true,
  get: function () {
    return _ShowBalanceView.default;
  }
});
Object.defineProperty(exports, "ExpenseTrackerView", {
  enumerable: true,
  get: function () {
    return _ExpenseTrackerView.default;
  }
});
Object.defineProperty(exports, "IncomeTrackerView", {
  enumerable: true,
  get: function () {
    return _IncomeTrackerView.default;
  }
});

var _AddTransactionView = _interopRequireDefault(require("./AddTransactionView"));

var _ShowBalanceView = _interopRequireDefault(require("./ShowBalanceView"));

var _ExpenseTrackerView = _interopRequireDefault(require("./ExpenseTrackerView"));

var _IncomeTrackerView = _interopRequireDefault(require("./IncomeTrackerView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./AddTransactionView":"src/js/Views/AddTransactionView.js","./ShowBalanceView":"src/js/Views/ShowBalanceView.js","./ExpenseTrackerView":"src/js/Views/ExpenseTrackerView.js","./IncomeTrackerView":"src/js/Views/IncomeTrackerView.js"}],"src/js/controller.js":[function(require,module,exports) {
"use strict";

var _model = require("./model");

var _Views = require("./Views");

var getTransactionsFromLS = function getTransactionsFromLS(type) {
  return JSON.parse(localStorage.getItem(type) || '[]');
};

var saveTransactionInLS = function saveTransactionInLS(type, transaction) {
  var list = getTransactionsFromLS(type);
  list.push(transaction);
  list = JSON.stringify(list);
  localStorage.setItem(type, list);
};

var controlAddTransaction = function controlAddTransaction(event) {
  event.preventDefault();
  var amount = _Views.AddTransactionView.amount,
      type = _Views.AddTransactionView.type;
  console.log(amount, type);
  var transaction = new _model.Transaction(type, amount);
  saveTransactionInLS(type, transaction);

  _Views.AddTransactionView.clearForm();
};

var controlShowBalance = function controlShowBalance() {
  console.log("StorageChangeListener triggered");
  var income = getTransactionsFromLS(_model.transactionType.INCOME);
  var expense = getTransactionsFromLS(_model.transactionType.EXPENSE);

  _Views.ShowBalanceView.render({
    income: income,
    expense: expense
  });
};

var controlUpdateExpenseList = function controlUpdateExpenseList(ev) {
  if (ev.detail.type === _model.transactionType.EXPENSE) _Views.ExpenseTrackerView.render(getTransactionsFromLS(_model.transactionType.EXPENSE));
};

var controlUpdateIncomeList = function controlUpdateIncomeList(ev) {
  if (ev.detail.type === _model.transactionType.INCOME) _Views.IncomeTrackerView.render(getTransactionsFromLS(_model.transactionType.INCOME));
};

var init = function init() {
  _Views.AddTransactionView.addSubmitHandler(controlAddTransaction);

  _Views.ShowBalanceView.addRenderListnerHandler(controlShowBalance);

  controlShowBalance();

  _Views.ExpenseTrackerView.addRenderHandler(controlUpdateExpenseList);

  _Views.ExpenseTrackerView.render(getTransactionsFromLS(_model.transactionType.EXPENSE));

  _Views.IncomeTrackerView.addRenderHandler(controlUpdateIncomeList);

  _Views.IncomeTrackerView.render(getTransactionsFromLS(_model.transactionType.INCOME));
};

init();
},{"./model":"src/js/model.js","./Views":"src/js/Views/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45125" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/controller.js"], null)
//# sourceMappingURL=/controller.e87f5190.js.map