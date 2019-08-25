/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "0c736f451b0a4da97a75";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "index";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/index.js")(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/MVC/controller.js":
/*!**********************************!*\
  !*** ./src/js/MVC/controller.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Controller {\r\n    constructor(model, view) {\r\n        this.model = model;\r\n        this.view = view;\r\n\r\n        view.on('add', this.addTodo.bind(this));\r\n        view.on('toggle', this.toggleTodo.bind(this));\r\n        view.on('edit', this.editTodo.bind(this));\r\n        view.on('remove', this.removeTodo.bind(this));\r\n\r\n        view.show(model.items);\r\n    }\r\n\r\n    addTodo(title) {\r\n        /**модель созадет новый объект*/\r\n        const item = this.model.addItem({\r\n            id       : Date.now(),\r\n            title,\r\n            completed: false\r\n        });\r\n\r\n        this.view.addItem(item); /** передаем представлению item, посредством метода addItem*/\r\n    }\r\n\r\n    toggleTodo({id, completed}) {\r\n        /** \"{id, completed}\" - объект*/\r\n        const item = this.model.updateItem(id, {completed});\r\n\r\n        this.view.toggleItem(item);\r\n    }\r\n\r\n    editTodo({id, title}) {\r\n        const item = this.model.updateItem(id, {title});\r\n\r\n        this.view.editItem( item);\r\n    }\r\n\r\n    removeTodo(id) {\r\n        this.model.removeItem(id);\r\n        this.view.removeItem(id);\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Controller);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvTVZDL2NvbnRyb2xsZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvTVZDL2NvbnRyb2xsZXIuanM/NGRkZCJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKG1vZGVsLCB2aWV3KSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIHRoaXMudmlldyA9IHZpZXc7XHJcblxyXG4gICAgICAgIHZpZXcub24oJ2FkZCcsIHRoaXMuYWRkVG9kby5iaW5kKHRoaXMpKTtcclxuICAgICAgICB2aWV3Lm9uKCd0b2dnbGUnLCB0aGlzLnRvZ2dsZVRvZG8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdmlldy5vbignZWRpdCcsIHRoaXMuZWRpdFRvZG8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdmlldy5vbigncmVtb3ZlJywgdGhpcy5yZW1vdmVUb2RvLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB2aWV3LnNob3cobW9kZWwuaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvZG8odGl0bGUpIHtcclxuICAgICAgICAvKirQvNC+0LTQtdC70Ywg0YHQvtC30LDQtNC10YIg0L3QvtCy0YvQuSDQvtCx0YrQtdC60YIqL1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLm1vZGVsLmFkZEl0ZW0oe1xyXG4gICAgICAgICAgICBpZCAgICAgICA6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlldy5hZGRJdGVtKGl0ZW0pOyAvKiog0L/QtdGA0LXQtNCw0LXQvCDQv9GA0LXQtNGB0YLQsNCy0LvQtdC90LjRjiBpdGVtLCDQv9C+0YHRgNC10LTRgdGC0LLQvtC8INC80LXRgtC+0LTQsCBhZGRJdGVtKi9cclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVUb2RvKHtpZCwgY29tcGxldGVkfSkge1xyXG4gICAgICAgIC8qKiBcIntpZCwgY29tcGxldGVkfVwiIC0g0L7QsdGK0LXQutGCKi9cclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5tb2RlbC51cGRhdGVJdGVtKGlkLCB7Y29tcGxldGVkfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlldy50b2dnbGVJdGVtKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUb2RvKHtpZCwgdGl0bGV9KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMubW9kZWwudXBkYXRlSXRlbShpZCwge3RpdGxlfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlldy5lZGl0SXRlbSggaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVG9kbyhpZCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwucmVtb3ZlSXRlbShpZCk7XHJcbiAgICAgICAgdGhpcy52aWV3LnJlbW92ZUl0ZW0oaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/MVC/controller.js\n");

/***/ }),

/***/ "./src/js/MVC/model.js":
/*!*****************************!*\
  !*** ./src/js/MVC/model.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ \"./src/js/helpers.js\");\n\r\n\r\nclass Model extends _helpers_js__WEBPACK_IMPORTED_MODULE_0__[\"EventEmitter\"] {\r\n    constructor(items = []) {\r\n        super();\r\n\r\n        this.items = items;\r\n    }\r\n\r\n    getItem(id) {\r\n        return this.items.find(function (item) {\r\n            return item.id == id;\r\n        });\r\n    }\r\n\r\n    /**Метод find() возвращает значение первого найденного в массиве элемента,\r\n     *которое удовлетворяет условию переданному в callback функции.\r\n     *В противном случае возвращается undefined.\r\n     */\r\n\r\n    addItem(item) {\r\n        this.items.push(item);\r\n        this.emit('change', this.items); /**Фиксация изменений для localStorage*/\r\n        return item;\r\n    }\r\n\r\n    updateItem(id, data) {\r\n        const item = this.getItem(id);\r\n        /**Метод Object.keys() возвращает массив из собственных перечисляемых свойств переданного объекта*/\r\n        Object.keys(data).forEach(function (prop) {\r\n            /**item[prop] - свойство объекта(с использованием скобочной записи)*/\r\n            return item[prop] = data[prop]\r\n        });\r\n\r\n        this.emit('change', this.items);/**Фиксация изменений для localStorage*/\r\n\r\n        return item;\r\n    }\r\n\r\n    removeItem(id) {\r\n        /**Метод findIndex() возвращает индекс в массиве, если элемент удовлетворяет условию проверяющей функции.\r\n         * В противном случае возвращается -1.*/\r\n        const index = this.items.findIndex(function (item)  {\r\n            return item.id == id\r\n        });\r\n\r\n        if (index > -1) {\r\n            this.items.splice(index, 1);\r\n            this.emit('change', this.items);/**Фиксация изменений для localStorage*/\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Model);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvTVZDL21vZGVsLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL01WQy9tb2RlbC5qcz9mODk5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICcuLi9oZWxwZXJzLmpzJztcclxuXHJcbmNsYXNzIE1vZGVsIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGl0ZW1zID0gW10pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbShpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT0gaWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq0JzQtdGC0L7QtCBmaW5kKCkg0LLQvtC30LLRgNCw0YnQsNC10YIg0LfQvdCw0YfQtdC90LjQtSDQv9C10YDQstC+0LPQviDQvdCw0LnQtNC10L3QvdC+0LPQviDQsiDQvNCw0YHRgdC40LLQtSDRjdC70LXQvNC10L3RgtCwLFxyXG4gICAgICrQutC+0YLQvtGA0L7QtSDRg9C00L7QstC70LXRgtCy0L7RgNGP0LXRgiDRg9GB0LvQvtCy0LjRjiDQv9C10YDQtdC00LDQvdC90L7QvNGDINCyIGNhbGxiYWNrINGE0YPQvdC60YbQuNC4LlxyXG4gICAgICrQkiDQv9GA0L7RgtC40LLQvdC+0Lwg0YHQu9GD0YfQsNC1INCy0L7Qt9Cy0YDQsNGJ0LDQtdGC0YHRjyB1bmRlZmluZWQuXHJcbiAgICAgKi9cclxuXHJcbiAgICBhZGRJdGVtKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLml0ZW1zKTsgLyoq0KTQuNC60YHQsNGG0LjRjyDQuNC30LzQtdC90LXQvdC40Lkg0LTQu9GPIGxvY2FsU3RvcmFnZSovXHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSXRlbShpZCwgZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xyXG4gICAgICAgIC8qKtCc0LXRgtC+0LQgT2JqZWN0LmtleXMoKSDQstC+0LfQstGA0LDRidCw0LXRgiDQvNCw0YHRgdC40LIg0LjQtyDRgdC+0LHRgdGC0LLQtdC90L3Ri9GFINC/0LXRgNC10YfQuNGB0LvRj9C10LzRi9GFINGB0LLQvtC50YHRgtCyINC/0LXRgNC10LTQsNC90L3QvtCz0L4g0L7QsdGK0LXQutGC0LAqL1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAgICAgLyoqaXRlbVtwcm9wXSAtINGB0LLQvtC50YHRgtCy0L4g0L7QsdGK0LXQutGC0LAo0YEg0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40LXQvCDRgdC60L7QsdC+0YfQvdC+0Lkg0LfQsNC/0LjRgdC4KSovXHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtW3Byb3BdID0gZGF0YVtwcm9wXVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuaXRlbXMpOy8qKtCk0LjQutGB0LDRhtC40Y8g0LjQt9C80LXQvdC10L3QuNC5INC00LvRjyBsb2NhbFN0b3JhZ2UqL1xyXG5cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJdGVtKGlkKSB7XHJcbiAgICAgICAgLyoq0JzQtdGC0L7QtCBmaW5kSW5kZXgoKSDQstC+0LfQstGA0LDRidCw0LXRgiDQuNC90LTQtdC60YEg0LIg0LzQsNGB0YHQuNCy0LUsINC10YHQu9C4INGN0LvQtdC80LXQvdGCINGD0LTQvtCy0LvQtdGC0LLQvtGA0Y/QtdGCINGD0YHQu9C+0LLQuNGOINC/0YDQvtCy0LXRgNGP0Y7RidC10Lkg0YTRg9C90LrRhtC40LguXHJcbiAgICAgICAgICog0JIg0L/RgNC+0YLQuNCy0L3QvtC8INGB0LvRg9GH0LDQtSDQstC+0LfQstGA0LDRidCw0LXRgtGB0Y8gLTEuKi9cclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaXRlbXMuZmluZEluZGV4KGZ1bmN0aW9uIChpdGVtKSAge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PSBpZFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdGhpcy5pdGVtcyk7Lyoq0KTQuNC60YHQsNGG0LjRjyDQuNC30LzQtdC90LXQvdC40Lkg0LTQu9GPIGxvY2FsU3RvcmFnZSovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/MVC/model.js\n");

/***/ }),

/***/ "./src/js/MVC/view.js":
/*!****************************!*\
  !*** ./src/js/MVC/view.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ \"./src/js/helpers.js\");\n\r\n\r\n/**\r\n * //Если один класс наследует методы другого класса- ОБЯЗАТЕЛЬНО указываем  метод super();\r\n */\r\nclass View extends _helpers_js__WEBPACK_IMPORTED_MODULE_0__[\"EventEmitter\"] {\r\n    constructor() {\r\n        super();\r\n\r\n        this.form = document.getElementById('todo-form');\r\n        this.input = document.getElementById('add-input');\r\n        this.list = document.getElementById('todo-list');\r\n\r\n        this.form.addEventListener('submit', this.handleAdd.bind(this));\r\n    }\r\n\r\n    createListItem(todo) {\r\n        const checkbox = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('input', {\r\n            type     : 'checkbox',\r\n            className: 'checkbox',\r\n            checked  : todo.completed ? 'checked' : ''\r\n        });\r\n        const label = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('label', {className: 'title'}, todo.title);\r\n        const editInput = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('input', {type: 'text', className: 'textfield'});\r\n        const editButton = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('button', {className: 'edit'}, 'Изменить');\r\n        const deleteButton = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('button', {className: 'remove'}, 'Удалить');\r\n        const item = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('li', {\r\n            className: `todo-item${todo.completed ? ' completed' : ''}`,\r\n            'data-id': todo.id\r\n        }, checkbox, label, editInput, editButton, deleteButton);\r\n\r\n        return this.addEventListeners(item);\r\n    }\r\n\r\n    addEventListeners(item) {\r\n        const checkbox = item.querySelector('.checkbox');\r\n        const editButton = item.querySelector('button.edit');\r\n        const removeButton = item.querySelector('button.remove');\r\n\r\n        checkbox.addEventListener('change', this.handleToggle.bind(this));\r\n        editButton.addEventListener('click', this.handleEdit.bind(this));\r\n        removeButton.addEventListener('click', this.handleRemove.bind(this));\r\n\r\n        return item;\r\n    }\r\n\r\n    findListItem(id) {\r\n        return this.list.querySelector(`[data-id=\"${id}\"]`);\r\n    }\r\n\r\n    handleAdd(event) {\r\n        event.preventDefault();\r\n\r\n        if (!this.input.value) {\r\n            return alert('Необходимо ввести название задачи.');\r\n        }\r\n        const value = this.input.value;\r\n\r\n        this.emit('add', value);\r\n    }\r\n\r\n\r\n    /**Действия с элементом (listItem) - новым todo - отметить, изменить, удалить.*/\r\n\r\n    handleToggle({target}) { //46:00\r\n        const listItem = target.parentNode;\r\n        const id = listItem.getAttribute('data-id');\r\n        const completed = target.checked;\r\n\r\n        this.emit('toggle', {id, completed});\r\n    }\r\n\r\n    handleEdit({target}) {\r\n        const listItem = target.parentNode;\r\n        const id = listItem.getAttribute('data-id');\r\n        const label = listItem.querySelector('.title');\r\n        const input = listItem.querySelector('.textfield');\r\n        const editButton = listItem.querySelector('button.edit');\r\n        const title = input.value;\r\n        const isEditing = listItem.classList.contains('editing');\r\n\r\n        if (isEditing) {\r\n            this.emit('edit', {id, title});\r\n        } else {\r\n            input.value = label.textContent;\r\n            editButton.textContent = 'Сохранить';\r\n            listItem.classList.add('editing');\r\n        }\r\n    }\r\n\r\n    handleRemove({target}) {\r\n        const listItem = target.parentNode;\r\n\r\n        this.emit('remove', listItem.getAttribute('data-id'));\r\n    }\r\n\r\n    /** ************************************************************************/\r\n\r\n    show(todos) {\r\n        todos.forEach(todo => {\r\n            const listItem = this.createListItem(todo);\r\n\r\n            this.list.appendChild(listItem);\r\n        });\r\n    }\r\n\r\n    addItem(todo) {\r\n        const listItem = this.createListItem(todo);\r\n\r\n        this.input.value = '';\r\n        this.list.appendChild(listItem);\r\n    }\r\n\r\n    toggleItem(todo) {\r\n        const listItem = this.findListItem(todo.id);\r\n        const checkbox = listItem.querySelector('.checkbox');\r\n\r\n        checkbox.checked = todo.completed;\r\n\r\n        if (todo.completed) {\r\n            listItem.classList.add('completed');\r\n        } else {\r\n            listItem.classList.remove('completed');\r\n        }\r\n    }\r\n\r\n    editItem(todo) {\r\n        const listItem = this.findListItem(todo.id);\r\n        const label = listItem.querySelector('.title');\r\n        const input = listItem.querySelector('.textfield');\r\n        const editButton = listItem.querySelector('button.edit');\r\n\r\n        label.textContent = todo.title;\r\n        editButton.textContent = 'Изменить';\r\n        listItem.classList.remove('editing');\r\n    }\r\n\r\n    removeItem(id) {\r\n        const listItem = this.findListItem(id);\r\n\r\n        this.list.removeChild(listItem);\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (View);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvTVZDL3ZpZXcuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvTVZDL3ZpZXcuanM/NzczMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NyZWF0ZUVsZW1lbnQsIEV2ZW50RW1pdHRlcn0gZnJvbSBcIi4uL2hlbHBlcnMuanNcIjtcclxuXHJcbi8qKlxyXG4gKiAvL9CV0YHQu9C4INC+0LTQuNC9INC60LvQsNGB0YEg0L3QsNGB0LvQtdC00YPQtdGCINC80LXRgtC+0LTRiyDQtNGA0YPQs9C+0LPQviDQutC70LDRgdGB0LAtINCe0JHQr9CX0JDQotCV0JvQrNCd0J4g0YPQutCw0LfRi9Cy0LDQtdC8ICDQvNC10YLQvtC0IHN1cGVyKCk7XHJcbiAqL1xyXG5jbGFzcyBWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0nKTtcclxuICAgICAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1pbnB1dCcpO1xyXG4gICAgICAgIHRoaXMubGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWxpc3QnKTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuaGFuZGxlQWRkLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUxpc3RJdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xyXG4gICAgICAgICAgICB0eXBlICAgICA6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2NoZWNrYm94JyxcclxuICAgICAgICAgICAgY2hlY2tlZCAgOiB0b2RvLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHtjbGFzc05hbWU6ICd0aXRsZSd9LCB0b2RvLnRpdGxlKTtcclxuICAgICAgICBjb25zdCBlZGl0SW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHt0eXBlOiAndGV4dCcsIGNsYXNzTmFtZTogJ3RleHRmaWVsZCd9KTtcclxuICAgICAgICBjb25zdCBlZGl0QnV0dG9uID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge2NsYXNzTmFtZTogJ2VkaXQnfSwgJ9CY0LfQvNC10L3QuNGC0YwnKTtcclxuICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7Y2xhc3NOYW1lOiAncmVtb3ZlJ30sICfQo9C00LDQu9C40YLRjCcpO1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjcmVhdGVFbGVtZW50KCdsaScsIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiBgdG9kby1pdGVtJHt0b2RvLmNvbXBsZXRlZCA/ICcgY29tcGxldGVkJyA6ICcnfWAsXHJcbiAgICAgICAgICAgICdkYXRhLWlkJzogdG9kby5pZFxyXG4gICAgICAgIH0sIGNoZWNrYm94LCBsYWJlbCwgZWRpdElucHV0LCBlZGl0QnV0dG9uLCBkZWxldGVCdXR0b24pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRFdmVudExpc3RlbmVycyhpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudExpc3RlbmVycyhpdGVtKSB7XHJcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5jaGVja2JveCcpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5lZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdidXR0b24ucmVtb3ZlJyk7XHJcblxyXG4gICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuaGFuZGxlVG9nZ2xlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUVkaXQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVSZW1vdmUuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRMaXN0SXRlbShpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUFkZChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYWxlcnQoJ9Cd0LXQvtCx0YXQvtC00LjQvNC+INCy0LLQtdGB0YLQuCDQvdCw0LfQstCw0L3QuNC1INC30LDQtNCw0YfQuC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ2FkZCcsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoq0JTQtdC50YHRgtCy0LjRjyDRgSDRjdC70LXQvNC10L3RgtC+0LwgKGxpc3RJdGVtKSAtINC90L7QstGL0LwgdG9kbyAtINC+0YLQvNC10YLQuNGC0YwsINC40LfQvNC10L3QuNGC0YwsINGD0LTQsNC70LjRgtGMLiovXHJcblxyXG4gICAgaGFuZGxlVG9nZ2xlKHt0YXJnZXR9KSB7IC8vNDY6MDBcclxuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIGNvbnN0IGlkID0gbGlzdEl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcbiAgICAgICAgY29uc3QgY29tcGxldGVkID0gdGFyZ2V0LmNoZWNrZWQ7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgndG9nZ2xlJywge2lkLCBjb21wbGV0ZWR9KTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFZGl0KHt0YXJnZXR9KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBjb25zdCBpZCA9IGxpc3RJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCcudGV4dGZpZWxkJyk7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5lZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICBjb25zdCBpc0VkaXRpbmcgPSBsaXN0SXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXRpbmcnKTtcclxuXHJcbiAgICAgICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2VkaXQnLCB7aWQsIHRpdGxlfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBsYWJlbC50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QuNGC0YwnO1xyXG4gICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdlZGl0aW5nJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVJlbW92ZSh7dGFyZ2V0fSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlJywgbGlzdEl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgc2hvdyh0b2Rvcykge1xyXG4gICAgICAgIHRvZG9zLmZvckVhY2godG9kbyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGhpcy5jcmVhdGVMaXN0SXRlbSh0b2RvKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkSXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmNyZWF0ZUxpc3RJdGVtKHRvZG8pO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgdGhpcy5saXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVJdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRoaXMuZmluZExpc3RJdGVtKHRvZG8uaWQpO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLmNoZWNrYm94Jyk7XHJcblxyXG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0b2RvLmNvbXBsZXRlZDtcclxuXHJcbiAgICAgICAgaWYgKHRvZG8uY29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlZGl0SXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbSh0b2RvLmlkKTtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZScpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLnRleHRmaWVsZCcpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCdidXR0b24uZWRpdCcpO1xyXG5cclxuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XHJcbiAgICAgICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9ICfQmNC30LzQtdC90LjRgtGMJztcclxuICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0aW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlSXRlbShpZCkge1xyXG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0oaWQpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3QucmVtb3ZlQ2hpbGQobGlzdEl0ZW0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWV3OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/MVC/view.js\n");

/***/ }),

/***/ "./src/js/helpers.js":
/*!***************************!*\
  !*** ./src/js/helpers.js ***!
  \***************************/
/*! exports provided: createElement, EventEmitter, save, load */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventEmitter\", function() { return EventEmitter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"save\", function() { return save; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load\", function() { return load; });\nfunction createElement(tag, props, ...children) {\r\n    const element = document.createElement(tag);\r\n\r\n    Object.keys(props).forEach(key => {\r\n        if (key.startsWith('data-')) {\r\n            element.setAttribute(key, props[key]);\r\n        } else {\r\n            element[key] = props[key];\r\n        }\r\n    });\r\n\r\n    children.forEach(child => {\r\n        if (typeof child === 'string') {\r\n            child = document.createTextNode(child);\r\n        }\r\n\r\n        element.appendChild(child);\r\n    });\r\n\r\n    return element;\r\n}\r\n\r\nclass EventEmitter { // c 01:06\r\n    constructor() {\r\n        this.events = {};\r\n    }\r\n\r\n    on(type, listener) {\r\n        /**если доступ к объекту что то вернет, то мы присваиваем -\r\n         this.events[type], в противном случае мы укажем пустой массив*/\r\n        this.events[type] = this.events[type] || [];\r\n        this.events[type].push(listener);\r\n    }\r\n\r\n    emit(type, arg) {\r\n        if (this.events[type]) {\r\n            this.events[type].forEach(function (listener) {\r\n                return listener(arg)\r\n            });\r\n        }\r\n    }\r\n}\r\n\r\nfunction save(data) {\r\n    const string = JSON.stringify(data);\r\n\r\n    localStorage.setItem('todos', string);\r\n}\r\n\r\nfunction load() {\r\n    const string = localStorage.getItem('todos');\r\n    const data = JSON.parse(string);\r\n\r\n    return data;\r\n}\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvaGVscGVycy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9oZWxwZXJzLmpzP2RlYTQiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIHByb3BzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCgnZGF0YS0nKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHByb3BzW2tleV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRba2V5XSA9IHByb3BzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5jbGFzcyBFdmVudEVtaXR0ZXIgeyAvLyBjIDAxOjA2XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIG9uKHR5cGUsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgLyoq0LXRgdC70Lgg0LTQvtGB0YLRg9C/INC6INC+0LHRitC10LrRgtGDINGH0YLQviDRgtC+INCy0LXRgNC90LXRgiwg0YLQviDQvNGLINC/0YDQuNGB0LLQsNC40LLQsNC10LwgLVxyXG4gICAgICAgICB0aGlzLmV2ZW50c1t0eXBlXSwg0LIg0L/RgNC+0YLQuNCy0L3QvtC8INGB0LvRg9GH0LDQtSDQvNGLINGD0LrQsNC20LXQvCDQv9GD0YHRgtC+0Lkg0LzQsNGB0YHQuNCyKi9cclxuICAgICAgICB0aGlzLmV2ZW50c1t0eXBlXSA9IHRoaXMuZXZlbnRzW3R5cGVdIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGVtaXQodHlwZSwgYXJnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW3R5cGVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIoYXJnKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmUoZGF0YSkge1xyXG4gICAgY29uc3Qgc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgc3RyaW5nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgIGNvbnN0IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvcycpO1xyXG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2Uoc3RyaW5nKTtcclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IHtjcmVhdGVFbGVtZW50LCBFdmVudEVtaXR0ZXIsIHNhdmUsIGxvYWR9OyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/helpers.js\n");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MVC_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MVC/model */ \"./src/js/MVC/model.js\");\n/* harmony import */ var _MVC_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MVC/view */ \"./src/js/MVC/view.js\");\n/* harmony import */ var _MVC_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MVC/controller */ \"./src/js/MVC/controller.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ \"./src/js/helpers.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst state = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__[\"load\"])();\r\n\r\nconst model = new _MVC_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](state || undefined);\r\nmodel.on('change', state => Object(_helpers__WEBPACK_IMPORTED_MODULE_3__[\"save\"])(state));\r\n\r\nconst view = new _MVC_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\nconst controller = new _MVC_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"](model, view);\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanM/N2JhNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWwgZnJvbSAnLi9NVkMvbW9kZWwnO1xyXG5pbXBvcnQgVmlldyBmcm9tICcuL01WQy92aWV3JztcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9NVkMvY29udHJvbGxlcic7XHJcblxyXG5pbXBvcnQgeyBzYXZlLCBsb2FkIH0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmNvbnN0IHN0YXRlID0gbG9hZCgpO1xyXG5cclxuY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoc3RhdGUgfHwgdW5kZWZpbmVkKTtcclxubW9kZWwub24oJ2NoYW5nZScsIHN0YXRlID0+IHNhdmUoc3RhdGUpKTtcclxuXHJcbmNvbnN0IHZpZXcgPSBuZXcgVmlldygpO1xyXG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIobW9kZWwsIHZpZXcpO1xyXG5cclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/index.js\n");

/***/ })

/******/ });