window.portol = function() {
    var pgStyleUtils = new StyleUtils();
    var portol_svgns = "http://www.w3.org/2000/svg";
    var portol_xlinkns = "http://www.w3.org/1999/xlink";
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f) {
        setTimeout(f, 1e3 / 60);
    };
    if (!Element.prototype.addEventListener) {
        var oListeners = {};
        function runListeners(oEvent) {
            if (!oEvent) {
                oEvent = window.event;
            }
            for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
                if (oEvtListeners.aEls[iElId] === this) {
                    for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) {
                        oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent);
                    }
                    break;
                }
            }
        }
        Element.prototype.addEventListener = function(sEventType, fListener) {
            if (oListeners.hasOwnProperty(sEventType)) {
                var oEvtListeners = oListeners[sEventType];
                for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
                    if (oEvtListeners.aEls[iElId] === this) {
                        nElIdx = iElId;
                        break;
                    }
                }
                if (nElIdx === -1) {
                    oEvtListeners.aEls.push(this);
                    oEvtListeners.aEvts.push([ fListener ]);
                    this["on" + sEventType] = runListeners;
                } else {
                    var aElListeners = oEvtListeners.aEvts[nElIdx];
                    if (this["on" + sEventType] !== runListeners) {
                        aElListeners.splice(0);
                        this["on" + sEventType] = runListeners;
                    }
                    for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
                        if (aElListeners[iLstId] === fListener) {
                            return;
                        }
                    }
                    aElListeners.push(fListener);
                }
            } else {
                oListeners[sEventType] = {
                    aEls: [ this ],
                    aEvts: [ [ fListener ] ]
                };
                this["on" + sEventType] = runListeners;
            }
        };
        Element.prototype.removeEventListener = function(sEventType, fListener) {
            if (!oListeners.hasOwnProperty(sEventType)) {
                return;
            }
            var oEvtListeners = oListeners[sEventType];
            for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
                if (oEvtListeners.aEls[iElId] === this) {
                    nElIdx = iElId;
                    break;
                }
            }
            if (nElIdx === -1) {
                return;
            }
            for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
                if (aElListeners[iLstId] === fListener) {
                    aElListeners.splice(iLstId, 1);
                }
            }
        };
    }
    function preventDefault() {}
    function preventDefaultForScrollKeys() {}
    function disableScroll() {}
    function enableScroll() {}
    if (!Object.keys) {
        Object.keys = function() {
            "use strict";
            var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !{
                toString: null
            }.propertyIsEnumerable("toString"), dontEnums = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], dontEnumsLength = dontEnums.length;
            return function(obj) {
                if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)) {
                    throw new TypeError("Object.keys called on non-object");
                }
                var result = [], prop, i;
                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }
                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }();
    }
    function DeleteBookmark(callbacks, params) {
        DeleteRequest.call(this, callbacks);
        this.mask = {
            loggedIn: true,
            videoKey: true
        };
    }
    DeleteBookmark.prototype = Object.create(DeleteRequest.prototype);
    DeleteBookmark.prototype.constructor = DeleteBookmark;
    function FavoriteRequest(callbacks, params) {
        ApiRequest.call(this, callbacks);
        var p = params || {};
        this.message = {
            loggedIn: p.loggedIn || null,
            videoKey: p.videoKey || null
        };
    }
    FavoriteRequest.prototype = Object.create(ApiRequest.prototype);
    FavoriteRequest.prototype.constructor = FavoriteRequest;
    function FavoriteService(allStates, params) {
        this.mapEvents().grantRights();
        this.playerState = allStates.playerState;
        this.favoriteRequest = new FavoriteRequest(this.playerState);
        this.deleteBookmark = new DeleteBookmark(this.playerState);
        return this;
    }
    FavoriteService.prototype.mapEvents = function() {
        return this;
    };
    FavoriteService.prototype.grantRights = function() {
        return this;
    };
    FavoriteService.prototype.onfavoriteRequest = function(attrs) {
        var self = this;
        var dest = "bookmark";
        var onsuccess = this.processFavoriteResponse.bind(this);
        var onerror = function(error) {
            console.log("Favorite request error.", error);
        };
        var callbacks = {
            onsuccess: onsuccess,
            onerror: onerror
        };
        this.favoriteRequest.makeRequest(dest, callbacks);
        return this;
    };
    FavoriteService.prototype.onbookmarkDeleteRequest = function() {
        var self = this;
        var dest = "bookmark";
        var onsuccess = function(status) {
            console.log(status);
        };
        var onerror = function(status) {
            console.log(status);
        };
        var callbacks = {
            onsuccess: onsuccess,
            onerror: onerror
        };
        this.deleteBookmark.makeRequest(dest, callbacks);
        return this;
    };
    FavoriteService.prototype.processFavoriteResponse = function(response) {
        var self = this;
        console.log("Player favorite response" + response);
        return this;
    };
    function LoadBalRequest(playerState, params) {
        ApiRequest.call(this, playerState);
        var p = params || {};
        this.message = {
            initialConnect: p.initialConnect || null,
            playerIP: p.playerIP || null,
            timerExpire: p.timerExpire || null,
            lastRequest: p.lastRequest || null,
            numPlays: p.numPlays || null,
            previewStatus: p.previewStatus || null,
            referrerId: p.referrerId || null,
            id: p.id || null,
            playerId: p.playerId || null,
            btcAddress: p.btcAddress || null,
            videoKey: p.videoKey || null,
            playerPayment: p.playerPayment || null,
            apiKey: p.apiKey || null,
            profile: p.profile || null,
            numPlayersUsed: p.numPlayersUsed || null,
            status: p.status || null,
            timeStarted: p.timeStarted || null,
            lastReply: p.lastReply || null,
            currentCloudPlayerId: p.currentCloudPlayerId || null,
            userAgent: p.userAgent || null
        };
    }
    LoadBalRequest.prototype = Object.create(ApiRequest.prototype);
    LoadBalRequest.prototype.constructor = LoadBalRequest;
    function LoadBalService(allStates, params) {
        this.initResponse = null;
        this.previewResponse = null;
        this.startResponse = null;
        this.mapEvents().grantRights();
        this.playerState = allStates.playerState;
        this.pairingState = allStates.pairingState;
        this.accountState = allStates.accountState;
        this.loadBalWS = new LoadBalWebsocket(allStates);
        this.loadBalRequest = new LoadBalRequest(this.playerState);
        this.isPlatformOwned = false;
        this.isPlatformPaired = false;
        this.isLoggedIn = false;
        this.noCurrentPlatform = true;
        return this;
    }
    LoadBalService.prototype.mapEvents = function() {
        return this;
    };
    LoadBalService.prototype.grantRights = function() {
        return this;
    };
    LoadBalService.prototype.queryStart = function() {
        var timeToNextQuery = 3e3;
        var dest = "start";
        var onsuccess = this.processStartResponse.bind(this, timeToNextQuery);
        var onerror = function(error) {
            console.log("Start Error: ", error);
        };
        var callbacks = {
            onsuccess: onsuccess,
            onerror: onerror
        };
        this.loadBalRequest.makeRequest(dest, callbacks);
        return this;
    };
    LoadBalService.prototype.queryUser = function() {
        var timeToNextQuery = 3e3;
        var dest = "user";
        var onsuccess = this.processUserResponse.bind(this, timeToNextQuery);
        var onerror = function(error) {
            console.log("User Error: ", error);
        };
        var callbacks = {
            onsuccess: onsuccess,
            onerror: onerror
        };
        this.loadBalRequest.makeRequest(dest, callbacks);
        return this;
    };
    LoadBalService.prototype.processUserResponse = function(timeToNextQuery, response) {
        var self = this;
        var r = response || {};
        console.log("user query", r);
        if (this.checkLoggedIn(r)) {
            console.log("User cleared");
            clearTimeout(self.userPoll);
            this.accountState.updateState(r);
        } else {
            console.log("Platform not owned.");
            self.userPoll = setTimeout(function() {
                self.queryUser();
            }, timeToNextQuery);
        }
    };
    LoadBalService.prototype.onstartPolling = function() {
        this.queryStart();
        return this;
    };
    LoadBalService.prototype.onpreviewRequest = function() {
        var dest = "preview";
        var onsuccess = function(resp) {
            console.log(resp);
        };
        var onerror = function(error) {
            console.log("Preview request error");
        };
        var callbacks = {
            onsuccess: onsuccess,
            onerror: onerror
        };
        this.loadBalRequest.makeRequest(dest, callbacks);
        return this;
    };
    LoadBalService.prototype.oninitRequest = function() {
        var self = this;
        var dest = "init";
        var onsuccess = this.processInitResponse.bind(this);
        var onerror = this.processInitError.bind(this);
        var callbacks = {
            onsuccess: onsuccess,
            onerror: onerror
        };
        this.loadBalRequest.makeRequest(dest, callbacks);
        return this;
    };
    LoadBalService.prototype.processStartResponse = function(timeToNextQuery, response) {
        var self = this;
        var r = response;
        if (this.checkPayment(response)) {
            clearTimeout(self.startPoll);
            this.playerState.updateState({
                dedicatedCloudHost: r.dedicatedCloudHost,
                status: r.newStatus,
                mpdAuthorized: r.mpdAuthorized,
                hostPlatform: r.hostPlatform
            });
            this.playerState.metaData = response.metaData;
            this.pairingState.updateState({
                castColor: r.hostPlatform.platformColor,
                qrcodeURL: r.qrURL
            });
            this.accountState.updateState(r.loggedIn);
            this.triggerVideoReady(response);
        } else {
            self.startPoll = setTimeout(function() {
                self.queryStart();
            }, timeToNextQuery);
        }
        if (this.noCurrentPlatform && this.checkPlatformOwned(response)) {
            this.playerState.stateEventBus.trigger("platformClaimed");
            this.queryUser();
            this.noCurrentPlatform = false;
        }
        if (!this.noCurrentPlatform && !this.isPlatformPaired && this.checkPlatformPaired(response)) {
            this.loadBalWS.initialize();
            this.isPlatformPaired = true;
            console.log("Opening loadbal webscoket.");
        }
        return this;
    };
    LoadBalService.prototype.processPreviewResponse = function(response) {
        this.triggerPreviewReady(response);
        return this;
    };
    LoadBalService.prototype.processInitResponse = function(response) {
        console.log("Init response: ", response);
        var r = response;
        this.playerState.updateState({
            apiKey: r.apiKey,
            btcAddress: r.btcPaymentAddr,
            status: r.newStatus,
            playerId: r.playerId,
            videoKey: r.videoKey,
            id: r.playerId,
            hostPlatform: r.hostPlatform
        });
        console.log("state after init", this.playerState);
        this.playerState.metaData = response.metaData;
        var mTextPair = typeof r.playerId === "string" ? r.playerId.substring(0, 5) : null;
        this.pairingState.updateState({
            castColor: r.color,
            qrcodeURL: r.qrURL,
            textPairCode: mTextPair
        });
        if (r.hostPlatform.platformColor && r.hostPlatform.platformColor !== "orphaned") {
            document.getElementById("pairing-button-icon").style.background = "#" + r.hostPlatform.platformColor;
        }
        this.accountState.updateState(r.loggedIn);
        this.triggerInitReady(response);
        return this;
    };
    LoadBalService.prototype.processInitError = function(error) {
        var e = error;
        switch (e.status) {
          case 303:
            window.setTimeout(this.oninitRequest.bind(this), 200);
            break;

          default:
            console.log("Init error: ", error);
        }
        return this;
    };
    LoadBalService.prototype.checkPayment = function(response) {
        var isPaid = false;
        if (response.mpdAuthorized) {
            isPaid = true;
        }
        return isPaid;
    };
    LoadBalService.prototype.checkLoggedIn = function(response) {
        var r = response || {};
        if (r.userName) {
            this.isLoggedIn = true;
        }
        return this.isLoggedIn;
    };
    LoadBalService.prototype.checkPlatformOwned = function(response) {
        if (!this.isPlatformOwned) {
            var r = response || {};
            if (r.hostPlatform.platformColor !== "orphaned") {
                this.isPlatformOwned = true;
            }
        }
        return this.isPlatformOwned;
    };
    LoadBalService.prototype.checkPlatformPaired = function(response) {
        var r = response || {};
        if (r.hostPlatform.paired) {
            this.isPlatformPaired = true;
        }
        return this.isPlatformPaired;
    };
    function LoadBalUtils(baseUrl, version) {
        this.baseUrl = baseUrl;
        this.version = version;
        this.currentPayment = 0;
    }
    LoadBalUtils.prototype.checkPayment = function(response) {
        var isPaid = false;
        if (response.mpdAuthorized) {
            isPaid = true;
        }
        return isPaid;
    };
    LoadBalUtils.prototype.startPolling = function() {
        var self = this;
        if (this.checkPayment()) {
            this.triggerInitReady();
        } else {
            this.startQuery = setTimeout(function() {
                self.startPolling();
            }, 3e3);
        }
    };
    LoadBalUtils.prototype.buildUrl = function(extension) {
        return this.baseUrl + "/" + this.version + "/" + extension;
    };
    function PlayerBuyRequest(callbacks, params) {
        ApiRequest.call(this, callbacks);
        var p = params || {};
        this.message = {
            btcAddress: p.btcAddress || null,
            playerId: p.playerId || null
        };
    }
    PlayerBuyRequest.prototype = Object.create(ApiRequest.prototype);
    PlayerBuyRequest.prototype.constructor = PlayerBuyRequest;
    function PlayerBuyService(allStates, params) {
        this.mapEvents().grantRights();
        this.playerState = allStates.playerState;
        this.playerBuyRequest = new PlayerBuyRequest(this.playerState);
        return this;
    }
    PlayerBuyService.prototype.mapEvents = function() {
        return this;
    };
    PlayerBuyService.prototype.grantRights = function() {
        return this;
    };
    PlayerBuyService.prototype.onplayerBuyRequest = function(attrs) {
        var self = this;
        var dest = "playerBuy";
        var onsuccess = this.processPlayerBuyResponse.bind(this);
        var onerror = function(error) {
            console.log("Player Buy request error.", error);
        };
        var callbacks = {
            onsuccess: onsuccess,
            onerror: onerror
        };
        this.playerBuyRequest.makeRequest(dest, callbacks);
        return this;
    };
    PlayerBuyService.prototype.processPlayerBuyResponse = function(response) {
        var self = this;
        return this;
    };
    function PortolSSEUtils() {
        this.apiUriExt = ":8901/api/v0/register";
        this.dedicatedCloudResource = "";
        return this;
    }
    PortolSSEUtils.prototype.initialize = function(attrs) {
        this.dedicatedCloudHost = attrs.dedicatedCloudHost;
        this.portolData = {
            playerId: attrs.playerId,
            btcAddr: attrs.btcPaymentAddr
        };
        var playerid = this.portolData.playerId;
        var addr = this.portolData.btcAddr;
        var uri = "http://" + this.dedicatedCloudHost + this.apiUriExt + "?playerid=" + playerid + "&addr=" + addr;
        console.log(uri);
        this.establishConnection(uri);
        return this;
    };
    PortolSSEUtils.prototype.establishConnection = function(uri) {
        var self = this;
        this.eventSource = new EventSource(uri);
        this.eventSource.addEventListener("message", function(event) {
            console.log("Server sent event: ", event);
            self.processSSEMessage(event.data);
        }, false);
        this.eventSource.addEventListener("open", function(open) {
            console.log("SSE Open: ", open);
        }, false);
        this.eventSource.addEventListener("error", function(error) {
            console.log("Server sent error: ", error);
            self.processSSEError(event);
        }, false);
        return this;
    };
    PortolSSEUtils.prototype.processSSEMessage = function(message) {
        console.log("SSE Message! " + message);
        return this;
    };
    PortolSSEUtils.prototype.processSSEError = function(error) {
        if (error.readyState == EventSource.CLOSED) {
            console.log("Connection was closed.");
        }
        return this;
    };
    function LoadBalWebsocket(synchronizedStates) {
        this.baseUrl = "wss://www.portol.me:8443";
        this.version = "v0";
        this.currentPayment = 0;
        this.playerState = synchronizedStates.playerState;
        this.pairingState = synchronizedStates.pairingState;
        this.accountState = synchronizedStates.accountState;
        this.pSocket = null;
    }
    LoadBalWebsocket.prototype.buildUrl = function(extension) {
        var params = this.playerState.getStateObject();
        var mAddress = params.btcAddress;
        var mPlayerId = params.playerId;
        return this.baseUrl + "/" + extension + "?" + "addr=" + mAddress + "&playerid=" + mPlayerId;
    };
    LoadBalWebsocket.prototype.initialize = function() {
        this.establishConnection(this.buildUrl("ws"));
        return this;
    };
    LoadBalWebsocket.prototype.startHeartbeat = function(event) {
        var self = this;
        var lbCallback = function() {
            self.pSocket.send("--heartbeat--");
            return;
        };
        this.heartbeat = setInterval(lbCallback, 1e4);
        return this;
    };
    LoadBalWebsocket.prototype.establishConnection = function(uri) {
        var self = this;
        this.pSocket = new WebSocket(uri);
        this.pSocket.onopen = this.startHeartbeat.bind(this);
        this.pSocket.onmessage = function(event) {
            self.processSocketIncMessage(event.data);
        };
        this.pSocket.onerror = function(event) {
            self.processSocketError(event);
        };
        return this;
    };
    LoadBalWebsocket.prototype.processSocketError = function(error) {
        console.log("LoadBal error", error);
        return this;
    };
    LoadBalWebsocket.prototype.processSocketIncMessage = function(message) {
        console.log("incoming message", message);
        return this;
    };
    function PortolWSUtils(synchronizedStates) {
        this.apiUriExt = ":8901/ws";
        this.dedicatedCloudHost = "";
        this.playerState = synchronizedStates.playerState;
        this.pairingState = synchronizedStates.pairingState;
        this.accountState = synchronizedStates.accountState;
        return this;
    }
    PortolWSUtils.prototype.onvideoReady = function() {
        this.initialize();
        return this;
    };
    PortolWSUtils.prototype.initialize = function() {
        var current = this.playerState.getStateObject();
        this.dedicatedCloudHost = current.dedicatedCloudHost;
        this.portolData = {
            playerId: current.playerId,
            btcAddr: current.btcAddress
        };
        var playerid = this.portolData.playerId;
        var addr = this.portolData.btcAddr;
        var uri = "ws://" + this.dedicatedCloudHost + this.apiUriExt + "?playerid=" + playerid + "&addr=" + addr;
        console.log(uri);
        this.establishConnection(uri);
        return this;
    };
    PortolWSUtils.prototype.startHeartbeat = function(event) {
        var self = this;
        var lbCallback = function() {
            self.pSocket.send("--heartbeat--");
            return;
        };
        this.heartbeat = setInterval(lbCallback, 1e4);
        return this;
    };
    PortolWSUtils.prototype.establishConnection = function(uri) {
        var self = this;
        this.pSocket = new WebSocket(uri);
        this.pSocket.onopen = this.startHeartbeat.bind(this);
        this.pSocket.onmessage = function(event) {
            self.processSocketIncMessage(event.data);
        };
        this.pSocket.onmessage = function(event) {
            self.processSocketIncMessage(event.data);
        };
        this.pSocket.onerror = function(event) {
            self.processSocketError(event);
        };
        return this;
    };
    PortolWSUtils.prototype.processSocketIncMessage = function(message) {
        var m = JSON.parse(message);
        this.playerState.updateState({
            status: m.status
        });
        switch (m.status) {
          case "STREAMING":
            this.triggerWebsocketPlay();
            break;

          case "PAUSED":
            this.triggerWebsocketPause();
            break;

          case "STOPPED":
            this.triggerWebsocketStopped();
            break;

          default:
            console.log("URGENT: No status update in websocket message!", m);
            break;
        }
        return this;
    };
    PortolWSUtils.prototype.processSocketError = function(error) {
        if (error.readyState == EventSource.CLOSED) {
            console.log("Connection was closed.");
        }
        return this;
    };
    function ApiRequest(playerState, dest, callbacks) {
        this.VERSION = "v0";
        var self = this;
        var mCallbacks = callbacks || {};
        this.dest = dest || "";
        this.utils = new EndpointUtils(this.VERSION);
        this.playerState = playerState;
        this.maskOn = false;
        return this;
    }
    ApiRequest.prototype.makeRequest = function(dest, callbacks) {
        var self = this;
        if (this.maskOn) {
            var mask = this.message;
            this.toSend = this.playerState.getState(mask);
        } else {
            this.toSend = this.playerState.getState();
        }
        var targetUrl = this.utils.buildUrl(dest);
        this.success = callbacks.onsuccess;
        this.error = callbacks.onerror || function(xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions, thrownError);
        };
        $.ajax({
            url: targetUrl,
            type: "POST",
            data: self.toSend,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: self.success.bind(self),
            error: self.error.bind(self)
        });
        return this;
    };
    ApiRequest.prototype.getMessage = function() {
        var self = this;
        console.log("Api Request: ", self);
        return JSON.stringify(self.message);
    };
    ApiRequest.prototype.setMessage = function(message) {
        this.message = message;
        return this;
    };
    ApiRequest.prototype.setDest = function(dest) {
        this.dest = dest;
    };
    ApiRequest.prototype.clearMessage = function() {};
    ApiRequest.prototype.destroy = function() {
        this.message = undefined;
    };
    function DeleteRequest(playerState, dest, callbacks) {
        this.VERSION = "v0";
        var self = this;
        var mCallbacks = callbacks || {};
        this.dest = dest || "";
        this.utils = new EndpointDeleteUtils(this.VERSION);
        this.playerState = playerState;
        return this;
    }
    DeleteRequest.prototype.makeRequest = function(dest, callbacks) {
        var self = this;
        this.toSend = this.playerState.getStateObject(this.mask);
        var targetUrl = this.utils.buildUrl(dest, this.toSend);
        this.success = callbacks.onsuccess;
        this.error = callbacks.onerror || function(xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions, thrownError);
        };
        $.ajax({
            url: targetUrl,
            type: "DELETE",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: self.success.bind(self),
            error: self.error.bind(self)
        });
        return this;
    };
    function EndpointDeleteUtils(version) {
        this.VERSION = version || "v0";
        this.currentPayment = 0;
        this.LOAD_BAL_URL = "https://portol.me";
        this.WILDCARD_URL = "https://wildcard.portol.com";
        this.LOAD_BAL_PORT = ":8443";
        this.BUY_PORT = ":5555";
        this.WILDCARD_PORT = ":5555";
    }
    EndpointDeleteUtils.prototype.buildUrl = function(type, params) {
        var baseUrl = "";
        var port = "";
        var path = "/";
        var dest = type;
        var invalidType = false;
        switch (type) {
          case "bookmark":
            var user = params.loggedIn || "";
            var videoKey = params.videoKey || "";
            baseUrl = this.LOAD_BAL_URL;
            port = this.BUY_PORT;
            dest = "bookmark";
            path = "/api/" + this.VERSION + "/" + dest + "/" + user.id + "/" + videoKey + "/";
            break;

          default:
            console.log("API destination is not supported: " + type + ".");
            invalidType = true;
        }
        var target;
        if (!invalidType) {
            target = baseUrl + port + path;
        } else {
            target = undefined;
        }
        return target;
    };
    function EndpointService(version, attrs, synchronizedStates) {
        this.utils = new EndpointUtils(version);
        this.playerState = synchronizedStates.playerState;
        this.pairingState = synchronizedStates.pairingState;
        this.accountState = synchronizedStates.accountState;
        var allStates = {
            playerState: this.playerState,
            pairingState: this.pairingState,
            accountState: this.accountState
        };
        this.loadBalService = new LoadBalService(allStates);
        this.playerBuyService = new PlayerBuyService(allStates);
        this.favoriteService = new FavoriteService(allStates);
        this.wsUtils = new PortolWSUtils(allStates);
        this.god = {};
        this.eventBus = new EventBus([ "initRequest", "previewRequest", "websocketPlay", "websocketPause", "websocketStopped", "startPolling", "initReady", "previewReady", "videoReady", "paymentChange", "playerBuyRequest", "favoriteRequest", "bookmarkDeleteRequest" ]);
        this.mapEvents().grantRights();
        this.eventBus.subscribe(this, [ "initReady", "websocketPlay", "websocketPause", "videoReady" ]);
        return this;
    }
    EndpointService.prototype.mapEvents = function() {
        this.eventBus.subscribe(this.loadBalService, [ "initRequest", "previewRequest", "startPolling" ]);
        this.eventBus.subscribe(this.playerBuyService, [ "playerBuyRequest" ]);
        this.eventBus.subscribe(this.favoriteService, [ "favoriteRequest", "bookmarkDeleteRequest" ]);
        this.eventBus.subscribe(this.wsUtils, [ "videoReady" ]);
        return this;
    };
    EndpointService.prototype.oninitReady = function(response) {
        this.triggerInitReady(response);
        var state = this.playerState.getState();
        this.god.triggerStartPolling(state);
        return this;
    };
    EndpointService.prototype.grantRights = function() {
        var self = this;
        this.wsUtils.triggerWebsocketPlay = this.eventBus.trigger.bind(this.eventBus, "websocketPlay");
        this.wsUtils.triggerWebsocketPause = this.eventBus.trigger.bind(this.eventBus, "websocketPause");
        this.loadBalService.triggerInitReady = this.eventBus.trigger.bind(this.eventBus, "initReady");
        this.loadBalService.triggerPreviewReady = this.eventBus.trigger.bind(this.eventBus, "previewReady");
        this.loadBalService.triggerVideoReady = this.eventBus.trigger.bind(this.eventBus, "videoReady");
        this.playerState.triggerPaymentChange = this.eventBus.trigger.bind(this.eventBus, "paymentChange");
        this.god.triggerStartPolling = this.eventBus.trigger.bind(this.eventBus, "startPolling");
        this.god.triggerInitRequest = this.eventBus.trigger.bind(this.eventBus, "initRequest");
        this.god.triggerPreviewRequest = this.eventBus.trigger.bind(this.eventBus, "previewRequest");
        this.god.triggerPlayerBuyRequest = this.eventBus.trigger.bind(this.eventBus, "playerBuyRequest");
        this.god.triggerFavoriteRequest = this.eventBus.trigger.bind(this.eventBus, "favoriteRequest");
        this.god.triggerBookmarkDeleteRequest = this.eventBus.trigger.bind(this.eventBus, "bookmarkDeleteRequest");
        return this;
    };
    EndpointService.prototype.doInit = function() {
        var state = this.playerState.getState();
        this.god.triggerInitRequest(state);
        return this;
    };
    EndpointService.prototype.onplayerBuyRequest = function(request) {
        this.god.triggerPlayerBuyRequest(request);
        return this;
    };
    EndpointService.prototype.onfavoriteRequest = function(request) {
        this.god.triggerFavoriteRequest(request);
        return this;
    };
    EndpointService.prototype.onbookmarkDeleteRequest = function(request) {
        this.god.triggerBookmarkDeleteRequest(request);
        return this;
    };
    EndpointService.prototype.onvideoReady = function(response) {
        this.triggerVideoReady(response);
        return this;
    };
    EndpointService.prototype.onwebsocketPlay = function() {
        this.triggerEndpointPlay();
        return this;
    };
    EndpointService.prototype.onwebsocketPause = function() {
        this.triggerEndpointPause();
        return this;
    };
    function EndpointUtils(version) {
        this.VERSION = version || "v0";
        this.currentPayment = 0;
        this.LOAD_BAL_URL = "https://portol.me";
        this.WILDCARD_URL = "https://wildcard.portol.com";
        this.LOAD_BAL_PORT = ":8443";
        this.BUY_PORT = ":5555";
        this.WILDCARD_PORT = ":5555";
    }
    EndpointUtils.prototype.buildUrl = function(type) {
        var baseUrl = "";
        var port = "";
        var path = "/";
        var dest = type;
        var invalidType = false;
        switch (type) {
          case "init":
            baseUrl = this.LOAD_BAL_URL;
            port = this.LOAD_BAL_PORT;
            path = "/api/" + this.VERSION + "/";
            break;

          case "start":
            baseUrl = this.LOAD_BAL_URL;
            port = this.LOAD_BAL_PORT;
            path = "/api/" + this.VERSION + "/";
            break;

          case "preview":
            baseUrl = this.LOAD_BAL_URL;
            port = this.LOAD_BAL_PORT;
            path = "/api/" + this.VERSION + "/";
            break;

          case "playerBuy":
            baseUrl = this.LOAD_BAL_URL;
            port = this.BUY_PORT;
            path = "/api/" + this.VERSION + "/";
            dest = "buyvideo/embedded";
            break;

          case "bookmark":
            baseUrl = this.LOAD_BAL_URL;
            port = this.BUY_PORT;
            path = "/api/" + this.VERSION + "/";
            break;

          case "user":
            baseUrl = this.LOAD_BAL_URL;
            port = this.BUY_PORT;
            path = "/api/" + this.VERSION + "/user/info/platform";
            dest = "";
            break;

          default:
            console.log("API destination is not supported: " + type + ".");
            invalidType = true;
        }
        var target;
        if (!invalidType) {
            target = baseUrl + port + path + dest;
        } else {
            target = undefined;
        }
        return target;
    };
    function AccountState(params) {
        SynchronousState.call(this);
        var p = params || {};
        this.paramPool = {
            id: p.id || null,
            userImg: p.userImg || null,
            userName: p.userName || null,
            firstName: p.firstName || null,
            email: p.email || null,
            currentToken: p.currentToken,
            lastName: p.lastName || null,
            signUpDate: p.signUpDate || null,
            lastSeen: p.lastSeen || null,
            platforms: p.platforms || null,
            loggedInPlatformId: p.loggedInPlatformId || null,
            loggedInPlatformExpire: p.loggedInPlatformExpire || null,
            funds: p.funds || null,
            history: p.history || null,
            bookmarked: p.bookmarked || []
        };
    }
    AccountState.prototype = Object.create(SynchronousState.prototype);
    AccountState.prototype.constructor = AccountState;
    AccountState.prototype.initialize = function() {
        this.createEventBus([ "newUser" ]);
        this.triggerNewUser = this.stateEventBus.trigger.bind(this.stateEventBus, "newUser");
        return this;
    };
    AccountState.prototype.addPlatform = function() {
        this.triggerNewUser();
        return this;
    };
    function CurrentToken(attrs) {
        var a = attrs || {};
        this.value = a.value;
        this.expiration = a.expiration;
        return this;
    }
    function PairingState(params) {
        SynchronousState.call(this);
        var p = params || {};
        this.paramPool = {
            castColor: p.color || null,
            qrcodeURL: p.qrcodeURL || null,
            textPairCode: p.textPairCode || null
        };
    }
    PairingState.prototype = Object.create(SynchronousState.prototype);
    PairingState.prototype.constructor = PairingState;
    function PlayerResponse(attrs) {
        this.setup(attrs);
    }
    PlayerResponse.prototype.setup = function(attrs) {
        attrs = attrs || {};
        this.id = attrs.id || null;
        this.btcPaymentAddr = attrs.btcPaymentAddr || null;
        this.mpdAuthorized = attrs.mpdAuthorized || false;
        this.dedicatedCloudHost = attrs.dedicatedCloudHost || null;
        this.loggedIn = new LoggedIn(attrs.loggedIn);
        this.newStatus = attrs.newStatus || "UNINITIALIZED";
        this.playerId = attrs.playerId || null;
        this.previewMPD = attrs.previewMPD || null;
        this.previewMPDAvailable = attrs.previewMPDAvailable || null;
        this.priceInCents = attrs.priceInCents || null;
        this.splashContents = attrs.splashContents || null;
        this.totReceived = attrs.totReceived || null;
        this.totRequest = attrs.totRequest || null;
        this.type = attrs.type || null;
        this.videoKey = attrs.videoKey || null;
        return this;
    };
    PlayerResponse.prototype.getSplashContents = function() {
        console.log(this.splashContents);
        return this.splashContents;
    };
    PlayerResponse.prototype.hasMPD = function(type) {
        var hasMPD = false;
        switch (type) {
          case "preview":
            if (this.previewMPD || this.previewMPDAvailable) {
                hasMPD = true;
            }
            break;

          case "main":
            if (this.mpdAuthorized) {
                hasMPD = true;
            }
            break;

          default:
            console.log('Need to specify parameter "type" in ServerReply.hasMPD(type) call.');
        }
        return hasMPD;
    };
    function PlayerState(params) {
        SynchronousState.call(this);
        var p = params || {};
        this.paramPool = {
            hostPlatform: p.hostPlatform || null,
            initialConnect: p.initialConnect || null,
            playerIP: p.playerIP || null,
            timerExpire: p.timerExpire || null,
            lastRequest: p.lastRequest || null,
            numPlays: p.numPlays || null,
            previewStatus: p.previewStatus || null,
            referrerId: p.referrerId || null,
            id: p.id || null,
            playerId: p.playerId || null,
            btcAddress: p.btcAddress || null,
            videoKey: p.videoKey || null,
            playerPayment: p.playerPayment || null,
            apiKey: p.apiKey || null,
            profile: p.profile || null,
            numPlayersUsed: p.numPlayersUsed || null,
            status: p.status || "UNINITIALIZED",
            timeStarted: p.timeStarted || null,
            lastReply: p.lastReply || null,
            currentCloudPlayerId: p.currentCloudPlayerId || null,
            userAgent: p.userAgent || null,
            mpdAuthorized: p.mpdAuthorized || null,
            dedicatedCloudHost: p.dedicatedCloudHost || null
        };
        this.metaData = {};
    }
    PlayerState.prototype = Object.create(SynchronousState.prototype);
    PlayerState.prototype.constructor = PlayerState;
    PlayerState.prototype.initialize = function() {
        this.createEventBus([ "platformClaimed" ]);
        this.triggerPlatformClaimed = this.stateEventBus.trigger.bind(this.stateEventBus, "platformClaimed");
        return this;
    };
    PlayerState.prototype.addPlatform = function() {
        this.triggerPlatformClaimed();
        return this;
    };
    function SynchronousState(params) {
        var p = params || {};
        this.paramPool = {};
        this.stateEventBus = null;
    }
    SynchronousState.prototype.createEventBus = function(events) {
        this.stateEventBus = new EventBus(events);
        return this;
    };
    SynchronousState.prototype.updateState = function(params) {
        var p = params || {};
        for (var property in p) {
            if (p.hasOwnProperty(property)) {
                if (this.paramPool.hasOwnProperty(property)) {
                    this.paramPool[property] = p[property];
                } else {
                    console.log("Error: updated nonexistent property: ", property);
                }
            }
        }
        return this;
    };
    SynchronousState.prototype.getState = function(specificFields) {
        var ret = this.getStateObject(specificFields);
        return JSON.stringify(ret);
    };
    SynchronousState.prototype.getStateObject = function(specificFields) {
        var ret = {};
        if (specificFields) {
            for (var property in specificFields) {
                if (this.paramPool.hasOwnProperty(property)) {
                    ret[property] = this.paramPool[property];
                } else {
                    console.log("Error: tried to retrieve nonexistent property: " + property);
                }
            }
        } else {
            ret = this.paramPool;
        }
        return ret;
    };
    SynchronousState.prototype.addChangeListener = function(target, callback) {
        if (!this.paramPool.hasOwnProperty[target]) {
            return undefined;
        }
        console.log("Not implemented yet.");
        return this;
    };
    function Player() {
        var context = new Dash.di.DashContext();
        this.dash = new MediaPlayer(context);
        this.dedicatedCloudHost = null;
        this.portolData = null;
        this.element = document.getElementById("pdash-player");
        return this;
    }
    Player.prototype.setup = function(attrs) {
        this.dedicatedCloudHost = attrs.dedicatedCloudHost;
        this.portolData = attrs.portolData;
        return this;
    };
    Player.prototype.hasRequiredParams = function(attrs) {
        attrs = attrs || {};
        var validity = typeof attrs.apiKey !== "undefined" && null !== attrs.apiKey;
        return validity;
    };
    Player.prototype.loadManifest = function() {
        var mpdLocation = this.dedicatedCloudHost;
        var url = "http://" + mpdLocation + ":8901/api/v0/mpd/vod/";
        console.log("url", url);
        this.dash.startup();
        this.dash.attachView(this.element);
        this.dash.attachSource(url, null, null, this.portolData);
        return this;
    };
    Player.prototype.updateManifest = function(manifestXML) {
        var srcObject = {
            mpdfile: manifestXML,
            isXML: true
        };
        this.dash.attachSource(srcObject, null, null, this.portolData);
        return this;
    };
    Player.prototype.startPlay = function() {
        this.dash.play();
        return this;
    };
    Player.prototype.doPlay = function() {
        var video = this.dash.getVideoModel();
        console.log("Player doPlay.");
        if (video) {
            video.play();
        } else {
            console.log("No video detected.");
        }
        return this;
    };
    Player.prototype.doPause = function() {
        console.log("Player doPause...");
        var video = this.dash.getVideoModel();
        if (video) {
            video.pause();
        } else {
            console.log("No video detected.");
        }
        return this;
    };
    function PlayerBuyButton(attrs) {
        var a = attrs || {};
        this.pressed = a.pressed || false;
        this.element = document.getElementById("player-option-buy");
        return this;
    }
    PlayerBuyButton.prototype.addHandlers = function() {
        var self = this;
        this.element.addEventListener("click", this.doBuy.bind(this));
        return this;
    };
    PlayerBuyButton.prototype.doBuy = function() {
        this.triggerPlayerBuyRequest();
        return this;
    };
    PlayerBuyButton.prototype.hide = function() {
        this.elemnet.classList.add("hidden-button");
        return this;
    };
    function PlayerContainer(synchronizedStates) {
        PanelContainer.call(this, {
            name: "watchButton",
            panel: "player",
            elementId: "player-container"
        });
        this.playerState = synchronizedStates.playerState;
        this.pairingState = synchronizedStates.pairingState;
        this.accountState = synchronizedStates.accountState;
        this.player = new Player();
        this.on = false;
        this.playerOptions = new PlayerOptions();
        this.playerBuyButton = new PlayerBuyButton();
        return this;
    }
    PlayerContainer.prototype = Object.create(PanelContainer.prototype);
    PlayerContainer.prototype.constructor = PlayerContainer;
    PlayerContainer.prototype.initialize = function() {
        this.playerBuyButton.addHandlers();
        this.eventBus = new EventBus([ "start", "play", "pause", "stop", "playerBuyRequest" ]);
        this.mapEvents().grantRights();
        return this;
    };
    PlayerContainer.prototype.grantRights = function() {
        this.playerBuyButton.triggerPlayerBuyRequest = this.eventBus.trigger.bind(this.eventBus, "playerBuyRequest");
        return this;
    };
    PlayerContainer.prototype.mapEvents = function() {
        this.eventBus.subscribe(this.player, [ "start", "play", "pause", "stop" ]);
        this.eventBus.subscribe(this, [ "playerBuyRequest" ]);
        return this;
    };
    PlayerContainer.prototype.onstartVideo = function() {
        var attrs = this.playerState.getStateObject();
        if (!this.on) {
            this.player.setup({
                dedicatedCloudHost: attrs.dedicatedCloudHost,
                portolData: {
                    playerId: attrs.playerId,
                    btcAddr: attrs.btcAddress
                }
            });
            this.on = true;
        }
        this.playerOptions.hide();
        this.element.appendChild(this.player.element);
        this.player.loadManifest();
        return this;
    };
    PlayerContainer.prototype.onpreviewReady = function(response) {
        if (!this.on) {
            this.player.setup();
            this.on = true;
        }
        this.element.appendChild(this.video.element);
        return this;
    };
    PlayerContainer.prototype.onendpointPlay = function() {
        this.player.doPlay();
        return this;
    };
    PlayerContainer.prototype.onendpointPause = function() {
        this.player.doPause();
        return this;
    };
    PlayerContainer.prototype.onplayerBuyRequest = function() {
        this.triggerPlayerBuyRequest();
        return this;
    };
    function PlayerOptions(attrs) {
        var a = attrs || {};
        this.element = document.getElementById("player-options-container");
        return this;
    }
    PlayerOptions.prototype.hide = function() {
        this.element.classList.add("hidden-container");
        return this;
    };
    function AccountButton(attrs) {
        ControlButton.call(this, {
            name: "accountButton",
            panel: "account",
            section: "accountPage",
            elementId: "account-button",
            specificMiniClass: true
        });
        this.addHandlers();
        return this;
    }
    AccountButton.prototype = Object.create(ControlButton.prototype);
    AccountButton.prototype.constructor = AccountButton;
    AccountButton.prototype.getElement = function() {
        return this.element;
    };
    function ControlBar(attrs) {
        var a = attrs || {};
        this.element = document.getElementById("control-bar");
        this.drawerButton = document.getElementById("drawer-controller");
        this.watchButton = new WatchButton(attrs);
        this.videoInfoButton = new VideoInfoButton(attrs);
        this.pairingButton = new PairingButton(attrs);
        this.accountButton = new AccountButton(attrs);
        this.buttons = [ this.watchButton, this.videoInfoButton, this.pairingButton, this.accountButton ];
        this.isOpen = a.open || true;
        this.eventBus = new EventBus([ "playerBuyRequest", "favoriteRequest", "bookmarkDeleteRequest", "controlClick" ]);
        this.grantRights().mapEvents();
        this.eventBus.subscribe(this, [ "controlClick", "playerBuyRequest" ]);
        var self = this;
        return this;
    }
    ControlBar.prototype.initialize = function() {
        this.stateHandlerSetup();
        return this;
    };
    ControlBar.prototype.toggleMiniButtons = function() {
        var ctr = 0;
        for (ctr = 0; ctr < this.buttons.length; ctr++) {
            var target = this.buttons[ctr];
            target.toggleMini();
        }
        return this;
    };
    ControlBar.prototype.closeDrawer = function() {
        if (this.isOpen) {
            this.element.classList.toggle("closed-drawer");
            this.element.classList.toggle("opened-drawer");
            this.toggleMiniButtons();
        }
        this.isOpen = false;
        return this;
    };
    ControlBar.prototype.openDrawer = function() {
        if (!this.isOpen) {
            this.element.classList.toggle("closed-drawer");
            this.element.classList.toggle("opened-drawer");
            this.toggleMiniButtons();
        }
        this.isOpen = true;
        return this;
    };
    ControlBar.prototype.hideDrawer = function() {
        this.element.classList.remove("closed-drawer");
        this.element.classList.remove("opened-drawer");
        this.element.classList.add("hidden-drawer");
        return this;
    };
    ControlBar.prototype.toggleDrawer = function() {
        if (this.isOpen) {
            this.closeDrawer();
        } else {
            this.openDrawer();
        }
        return this;
    };
    ControlBar.prototype.grantRights = function() {
        this.watchButton.triggerControlClick = this.eventBus.trigger.bind(this.eventBus, "controlClick");
        this.videoInfoButton.triggerControlClick = this.eventBus.trigger.bind(this.eventBus, "controlClick");
        this.pairingButton.triggerControlClick = this.eventBus.trigger.bind(this.eventBus, "controlClick");
        this.accountButton.triggerControlClick = this.eventBus.trigger.bind(this.eventBus, "controlClick");
        return this;
    };
    ControlBar.prototype.mapEvents = function() {
        return this;
    };
    ControlBar.prototype.oncontrolClick = function(attrs) {
        this.triggerRotateCarousel(attrs.panel);
        return this;
    };
    ControlBar.prototype.onobservableScroll = function(observed) {
        var panels = observed.panels;
        var carousel = observed.carousel;
        var modules = Object.keys(panels);
        var ctr = 0;
        for (ctr = 0; ctr < modules.length; ctr++) {
            var panelName = modules[ctr];
            var target = panels[panelName];
            target.name = panelName;
            var POI = target;
            var bCtr = 0;
            for (bCtr = 0; bCtr < this.buttons.length; bCtr++) {
                var BOI = this.buttons[bCtr];
                if (POI.name == BOI.panel) {
                    if (POI.inFocus) {
                        BOI.focus();
                    } else {
                        BOI.unfocus();
                    }
                }
            }
        }
        return this;
    };
    ControlBar.prototype.onplayerBuyRequest = function() {
        this.triggerPlayerBuyRequest();
        return this;
    };
    ControlBar.prototype.stateHandlerSetup = function() {
        var self = this;
        this.element.addEventListener("click", this.toggleDrawer.bind(this));
        return this;
    };
    ControlBar.prototype.onshyify = function() {
        this.element.classList.add("hide-drawer");
        this.element.classList.remove("closed-drawer");
        this.element.classList.remove("opened-drawer");
        return this;
    };
    ControlBar.prototype.onstopShyify = function() {
        if (this.isOpen) {
            this.element.classList.toggle("closed-drawer");
            this.element.classList.toggle("opened-drawer");
            this.toggleMiniButtons();
        }
    };
    ControlBar.prototype.onplatformClaimed = function() {};
    function ControlButton(attrs) {
        var a = attrs || {};
        this.pressed = a.pressed || false;
        this.name = a.name;
        this.panel = a.panel;
        this.mSection = a.section;
        this.elementId = a.elementId;
        this.element = document.getElementById(a.elementId);
        this.specificMiniClass = a.specificMiniClass || false;
        this.elementIcon = document.getElementById(a.elementId + "-icon");
        this.elementIconImage = document.getElementById(a.elementId + "-icon-image");
        this.elementLabel = document.getElementById(a.elementId + "-main");
        return this;
    }
    ControlButton.prototype.addHandlers = function() {
        var self = this;
        this.element.addEventListener("click", self.clickAction.bind(self));
        return this;
    };
    ControlButton.prototype.getElement = function() {
        return this.element;
    };
    ControlButton.prototype.getPressed = function() {
        return this.pressed;
    };
    ControlButton.prototype.setPressed = function(pressed) {
        this.pressed = pressed;
        return this;
    };
    ControlButton.prototype.togglePressed = function() {
        this.setPressed(!this.pressed);
        return this;
    };
    ControlButton.prototype.clickAction = function(event) {
        event.stopPropagation();
        this.togglePressed();
        $.fn.fullpage.moveTo(this.mSection);
        return this;
    };
    ControlButton.prototype.focus = function() {
        if (this.element.classList.contains("splash-button-focus")) {} else {
            this.element.classList.add("splash-button-focus");
        }
        return this;
    };
    ControlButton.prototype.unfocus = function() {
        if (this.element.classList.contains("splash-button-focus")) {
            this.element.classList.remove("splash-button-focus");
        } else {}
        return this;
    };
    ControlButton.prototype.toggleMini = function() {
        if (this.elementIcon) {
            this.elementIcon.classList.toggle("normal");
            this.elementIcon.classList.toggle("mini");
            this.elementLabel.classList.toggle("normal");
            this.elementLabel.classList.toggle("mini");
            this.elementIconImage.classList.toggle("normal");
            this.elementIconImage.classList.toggle("mini");
            this.element.classList.toggle("normal");
            this.element.classList.toggle("mini");
        }
        return this;
    };
    function DrawerButton(attrs) {
        ControlButton.call(this, {
            name: "drawerButton",
            panel: null,
            elementId: "drawer-button",
            specificMiniClass: true
        });
        this.addExtendedHandlers();
        return this;
    }
    DrawerButton.prototype = Object.create(ControlButton.prototype);
    DrawerButton.prototype.constructor = DrawerButton;
    DrawerButton.prototype.getElement = function() {
        return this.element;
    };
    DrawerButton.prototype.addExtendedHandlers = function() {
        this.addHandlers();
        return this;
    };
    function PairingButton(attrs) {
        ControlButton.call(this, {
            name: "pairingButton",
            panel: "pairing",
            section: "pairingPage",
            elementId: "pairing-button",
            specificMiniClass: true
        });
        this.addHandlers();
        return this;
    }
    PairingButton.prototype = Object.create(ControlButton.prototype);
    PairingButton.prototype.constructor = PairingButton;
    PairingButton.prototype.getElement = function() {
        return this.element;
    };
    PairingButton.prototype.setPlatformColor = function(color) {
        this.elementIcon.style.background = "#" + color;
        return this;
    };
    function PortolButton(attrs) {
        ControlButton.call(this, {
            name: "portolButton",
            panel: "account",
            section: "accountPage",
            elementId: "portol-button",
            specificMiniClass: true
        });
        this.addHandlers();
        return this;
    }
    PortolButton.prototype = Object.create(ControlButton.prototype);
    PortolButton.prototype.constructor = PortolButton;
    PortolButton.prototype.getElement = function() {
        return this.element;
    };
    function PreviewButton(attrs) {
        ControlButton.call(this, {
            name: "previewButton",
            panel: "player",
            elementId: "preview-button"
        });
        this.addHandlers();
        return this;
    }
    PreviewButton.prototype = Object.create(ControlButton.prototype);
    PreviewButton.prototype.constructor = PreviewButton;
    PreviewButton.prototype.getIconElement = function() {
        return this.iconElement;
    };
    PreviewButton.prototype.getElement = function() {
        return this.element;
    };
    function VideoInfoButton(attrs) {
        ControlButton.call(this, {
            name: "videoInfoButton",
            panel: "video-info",
            section: "videoInfoPage",
            elementId: "video-info-button",
            specificMiniClass: true
        });
        this.addHandlers();
        return this;
    }
    VideoInfoButton.prototype = Object.create(ControlButton.prototype);
    VideoInfoButton.prototype.constructor = VideoInfoButton;
    VideoInfoButton.prototype.getElement = function() {
        return this.element;
    };
    function WatchButton(attrs) {
        ControlButton.call(this, {
            name: "watchButton",
            panel: "player",
            section: "playerPage",
            elementId: "watch-button",
            specificMiniClass: true
        });
        this.addHandlers();
        return this;
    }
    WatchButton.prototype = Object.create(ControlButton.prototype);
    WatchButton.prototype.constructor = WatchButton;
    WatchButton.prototype.getElement = function() {
        return this.element;
    };
    function PairingContainer(pairingState) {
        PanelContainer.call(this, {
            name: "pairingPanel",
            panel: "pairing",
            elementId: "pairing-panel"
        });
        this.pairingState = pairingState;
        this.qrcode = {};
        this.textPair = null;
        return this;
    }
    PairingContainer.prototype = Object.create(PanelContainer.prototype);
    PairingContainer.prototype.constructor = PairingContainer;
    PairingContainer.prototype.initialize = function() {
        var attrs = this.pairingState.getStateObject() || {};
        this.textPair = new TextPair(attrs.textPairCode);
        this.qrcode = new QrCode({
            url: attrs.qrcodeURL
        });
        if ("undefined" !== typeof attrs.castColor && null !== attrs.castColor) {
            var cc = attrs.castColor;
            console.log(cc.length);
            while (cc.length < 6) {
                cc = "0" + cc;
            }
            console.log("color", "#" + cc);
            this.elementIconImage.style.backgroundColor = "#" + cc;
        }
        this.eventBus = new EventBus([ "controlClick" ]);
        this.mapEvents().grantRights();
        return this;
    };
    PairingContainer.prototype.grantRights = function() {
        return this;
    };
    PairingContainer.prototype.mapEvents = function() {
        return this;
    };
    function ConnectionStatus(attrs) {
        this.element = document.getElementById("connection-status");
        this.initialize(attrs).buildElement();
    }
    ConnectionStatus.prototype.initialize = function(attrs) {
        attrs = attrs || {};
        this.status = attrs.status || .5;
        return this;
    };
    ConnectionStatus.prototype.buildElement = function() {
        this.element.innerHTML = "ooooo";
        this.updateDisplay();
        return this;
    };
    ConnectionStatus.prototype.updateDisplay = function() {
        this.element.style.color = "rgb(0, " + status * 100 + "," + (1 - status) * 100 + ")";
        return this;
    };
    ConnectionStatus.prototype.getElement = function() {
        return this.element || this.buildElement().element;
    };
    ConnectionStatus.prototype.getStatus = function() {
        return this.status;
    };
    ConnectionStatus.prototype.setStatus = function(status) {
        this.status = status;
        this.updateDisplay();
        return this;
    };
    function QrCode(attrs) {
        this.element = document.getElementById("qrcode-img");
        this.url = attrs.url;
        this.type = attrs.type || null;
        this.rawData = attrs.rawData || null;
        this.description = attrs.description || null;
        this.buildElement();
        return this;
    }
    QrCode.prototype.buildElement = function() {
        if (this.url) {
            this.element.src = this.url;
        } else if (this.rawData) {
            this.element.src = "data:" + this.type + ";base64," + this.rawData;
        } else {
            console.log("No qr code.");
        }
        return this;
    };
    QrCode.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function TextPair(code) {
        this.element = document.getElementById("text-pair-code");
        this.initialize(code).buildElement();
        return this;
    }
    TextPair.prototype.initialize = function(code) {
        this.code = code || "Uhhhh";
        return this;
    };
    TextPair.prototype.buildElement = function() {
        this.element.innerHTML = this.code;
        return this;
    };
    TextPair.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function PortolContainer(pairingState) {
        PanelContainer.call(this);
        this.element = document.getElementById("portol-panel");
        return this;
    }
    PortolContainer.prototype = Object.create(PanelContainer.prototype);
    PortolContainer.prototype.constructor = PortolContainer;
    PortolContainer.prototype.initialize = function() {
        this.eventBus = new EventBus([ "controlClick" ]);
        this.mapEvents().grantRights().buildElement();
        return this;
    };
    PortolContainer.prototype.grantRights = function() {
        return this;
    };
    PortolContainer.prototype.mapEvents = function() {
        return this;
    };
    PortolContainer.prototype.buildElement = function() {
        return this;
    };
    function AccountInfoSymbol(attr) {
        var self = this;
        var params = attr || {};
        this.pressed = false;
        this.radius = 30;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.start = 10;
        this.end = this.width - this.start;
        this.symbol = document.createElementNS(portol_svgns, "svg");
        this.symbol.setAttribute("viewBox", "0 0 60 60");
        this.symbol.setAttribute("width", this.width);
        this.symbol.style.position = "absolute";
        this.symbol.style.left = "0";
        this.symbol.style.top = "50%";
        this.grad = new GradPackage();
        this.symbol.appendChild(this.grad.getDefs("accountInfo"));
        this.symbol.setAttribute("height", this.height);
        this.circle = document.createElementNS(portol_svgns, "circle");
        this.circle.setAttribute("preserveAspectRatio", "midXmidY meet");
        this.circle.setAttribute("cx", this.radius);
        this.circle.setAttribute("cy", this.radius);
        this.circle.setAttribute("r", this.radius);
        this.circle.setAttribute("fill", "url(#accountInfo-rad-gradient)");
        this.topLine = this.drawBar(this.start, this.end, this.height / 3, "#008888");
        this.midLine = this.drawBar(this.start, this.end, this.height / 2, "#00FF22");
        this.bottomLine = this.drawBar(this.start, this.end, 2 * this.height / 3, "#008888");
        this.symbol.appendChild(this.circle);
        this.symbol.appendChild(this.topLine);
        this.symbol.appendChild(this.midLine);
        this.symbol.appendChild(this.bottomLine);
        this.symbol.onclick = function(ev) {
            this.clickAction(ev);
        };
        this.symbol.onclick = params.clickHandler || self.clickAction.bind(self);
        return this;
    }
    AccountInfoSymbol.prototype.drawBar = function(xStart, xEnd, y, color) {
        var height = 7;
        var L = document.createElementNS(portol_svgns, "rect");
        L.setAttribute("width", xEnd - xStart);
        L.setAttribute("height", height);
        L.setAttribute("x", xStart);
        L.setAttribute("y", y - height / 2);
        L.setAttribute("fill", color);
        L.setAttribute("rx", "4");
        return L;
    };
    AccountInfoSymbol.prototype.getElement = function() {
        return this.symbol;
    };
    AccountInfoSymbol.prototype.getPressed = function() {
        return this.pressed;
    };
    AccountInfoSymbol.prototype.togglePressed = function(vals) {
        this.setPressed(!this.pressed);
        return this;
    };
    AccountInfoSymbol.prototype.setPressed = function(pressed) {
        this.pressed = pressed;
        return this;
    };
    AccountInfoSymbol.prototype.clickAction = function(ev) {
        console.log(ev);
        ev.stopPropagation();
        this.togglePressed();
        this.triggerControlClick({
            depressed: this.pressed,
            unpressed: !this.pressed
        });
        return this;
    };
    function BtCEmblem() {
        this.symbol = document.createElementNS(portol_svgns, "symbol");
        this.symbol.setAttribute("id", "portol-btcEmb");
        this.symbol.setAttribute("transform", "translate(0.00630876,-0.00301984)");
        this.p1 = document.createElementNS(portol_svgns, "path");
        this.p2 = document.createElementNS(portol_svgns, "path");
        this.symbol.appendChild(this.p1);
        this.symbol.appendChild(this.p2);
        this.p1.setAttribute("d", "m63.033,39.744c-4.274,17.143-21.637,27.576-38.782,23.301-17.138-4.274-27.571-21.638-23.295-38.78,4.272-17.145,21.635-27.579,38.775-23.305,17.144,4.274,27.576,21.64,23.302,38.784z");
        this.p1.setAttribute("fill", "#f7931a");
        this.p2.setAttribute("d", "m46.103,27.444c0.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768-3.511-0.875-1.4,5.616c-0.923-0.23-1.871-0.447-2.813-0.662l1.41-5.653-3.509-0.875-1.439,5.766c-0.764-0.174-1.514-0.346-2.242-0.527l0.004-0.018-4.842-1.209-0.934,3.75s2.605,0.597,2.55,0.634c1.422,0.355,1.679,1.296,1.636,2.042l-1.638,6.571c0.098,0.025,0.225,0.061,0.365,0.117-0.117-0.029-0.242-0.061-0.371-0.092l-2.296,9.205c-0.174,0.432-0.615,1.08-1.609,0.834,0.035,0.051-2.552-0.637-2.552-0.637l-1.743,4.019,4.569,1.139c0.85,0.213,1.683,0.436,2.503,0.646l-1.453,5.834,3.507,0.875,1.439-5.772c0.958,0.26,1.888,0.5,2.798,0.726l-1.434,5.745,3.511,0.875,1.453-5.823c5.987,1.133,10.489,0.676,12.384-4.739,1.527-4.36-0.076-6.875-3.226-8.515,2.294-0.529,4.022-2.038,4.483-5.155zm-8.022,11.249c-1.085,4.36-8.426,2.003-10.806,1.412l1.928-7.729c2.38,0.594,10.012,1.77,8.878,6.317zm1.086-11.312c-0.99,3.966-7.1,1.951-9.082,1.457l1.748-7.01c1.982,0.494,8.365,1.416,7.334,5.553z");
        this.p2.setAttribute("fill", "#FFFFFF");
        return this;
    }
    BtCEmblem.prototype.getSymbol = function() {
        return this.symbol;
    };
    function BtCIcon(standalone) {
        this.standalone = standalone;
        if (this.standalone) {
            this.main = document.createElementNS(portol_svgns, "svg");
            this.main.setAttribute("class", "icon");
            this.main.setAttribute("width", 130);
            this.main.setAttribute("height", 80);
            this.main.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        } else {
            this.main = document.createElementNS(portol_svgns, "g");
            this.main.setAttribute("width", 130);
            this.main.setAttribute("height", 80);
            this.main.setAttribute("viewBox", "0 0 130 80");
            this.main.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        }
        this.gradientDefs = new GradPackage().getDefs("portol-btcGrad");
        this.main.appendChild(this.gradientDefs);
        this.btcSymbol = document.createElementNS(portol_svgns, "use");
        this.btcSymbol.setAttributeNS(portol_xlinkns, "xlink:href", "#portol-btcSymb");
        this.btcSymbol.setAttribute("x", 0);
        this.btcSymbol.setAttribute("y", 0);
        this.main.appendChild(this.btcSymbol);
        this.main.setAttribute("id", "portol-btcIcon");
        return this;
    }
    BtCIcon.prototype.getSVGElement = function() {
        return this.main;
    };
    function BtCSymbol() {
        this.symbol = document.createElementNS(portol_svgns, "svg");
        this.symbol.setAttribute("id", "portol-btcSymb");
        this.symbol.setAttribute("viewBox", "0 0 130 80");
        this.symbol.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        this.bgRect = document.createElementNS(portol_svgns, "rect");
        this.symbol.appendChild(this.bgRect);
        this.bgRect.setAttribute("width", "130");
        this.bgRect.setAttribute("height", "80");
        this.bgRect.setAttribute("fill", "url(#portol-btcGrad)");
        this.text = document.createElementNS(portol_svgns, "text");
        this.text.setAttribute("x", "20");
        this.text.setAttribute("y", "45");
        this.text.setAttribute("font-family", "Open Sans, Lucida Grande, Tahoma, Verdana, sans-serif");
        this.text.setAttribute("font-weight", "400");
        this.text.setAttribute("font-size", "1.2em");
        this.text.setAttribute("fill", "#FFFFFF");
        this.text.setAttribute("style", "color: #FFFFFF");
        this.text.innerHTML = "0.15";
        this.symbol.appendChild(this.text);
        this.emblem = document.createElementNS(portol_svgns, "use");
        this.emblem.setAttributeNS(portol_xlinkns, "xlink:href", "#portol-btcEmb");
        this.emblem.setAttribute("x", "100");
        this.emblem.setAttribute("y", "20");
        this.emblem.setAttribute("transform", "scale(0.7)");
        this.symbol.appendChild(this.emblem);
        return this;
    }
    BtCSymbol.prototype.getSymbol = function() {
        return this.symbol;
    };
    function CharmEmblem() {
        this.symbol = document.createElementNS(portol_svgns, "symbol");
        this.symbol.setAttribute("id", "portol-charmEmb");
        this.circle = document.createElementNS(portol_svgns, "circle");
        this.circle.setAttribute("cx", 40);
        this.circle.setAttribute("cy", 40);
        this.circle.setAttribute("r", 25);
        this.circle.setAttribute("fill", "blue");
        this.p1 = document.createElementNS(portol_svgns, "path");
        this.p2 = document.createElementNS(portol_svgns, "path");
        this.symbol.appendChild(this.circle);
        this.symbol.appendChild(this.p1);
        this.symbol.appendChild(this.p2);
        this.p1.setAttribute("d", "m 145,312 c -2,69 31,100 104,102 78,1 113,-34 109,-101 -6,-58 -62,-73 -106,-79 -48,-17 -99,-25 -99,-95 0,-48 32,-79 99,-78 60,0 97,25 96,84");
        this.p1.setAttribute("fill", "#FFFFFF");
        this.p2.setAttribute("d", "m 250,15 0,470");
        this.p2.setAttribute("fill", "#FFFFFF");
        return this;
    }
    CharmEmblem.prototype.getSymbol = function() {
        return this.symbol;
    };
    function CharmIcon(standalone) {
        this.standalone = standalone;
        if (this.standalone) {
            this.main = document.createElementNS(portol_svgns, "svg");
            this.main.setAttribute("class", "icon");
            this.main.setAttribute("width", 130);
            this.main.setAttribute("height", 80);
            this.main.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        } else {
            this.main = document.createElementNS(portol_svgns, "g");
            this.main.setAttribute("width", 130);
            this.main.setAttribute("height", 80);
            this.main.setAttribute("viewBox", "0 0 130 80");
            this.main.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        }
        this.charmSymbol = document.createElementNS(portol_svgns, "use");
        this.charmSymbol.setAttributeNS(portol_xlinkns, "xlink:href", "#portol-charmSymb");
        this.charmSymbol.setAttribute("x", 0);
        this.charmSymbol.setAttribute("y", 0);
        this.main.appendChild(this.charmSymbol);
        this.main.setAttribute("id", "portol-charmIcon");
        return this;
    }
    CharmIcon.prototype.getSVGElement = function() {
        return this.main;
    };
    function CharmSymbol() {
        this.symbol = document.createElementNS(portol_svgns, "symbol");
        this.symbol.setAttribute("width", 130);
        this.symbol.setAttribute("height", 80);
        this.symbol.setAttribute("id", "portol-charmSymb");
        this.symbol.setAttribute("viewBox", "0 0 130 80");
        this.symbol.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        this.bgRect = document.createElementNS(portol_svgns, "rect");
        this.bgRect.setAttribute("width", "130");
        this.bgRect.setAttribute("height", "80");
        this.bgRect.setAttribute("fill", "#00D599");
        this.symbol.appendChild(this.bgRect);
        this.text = document.createElementNS(portol_svgns, "text");
        this.text.setAttribute("x", "20");
        this.text.setAttribute("y", "45");
        this.text.setAttribute("font-family", "Open Sans, Lucida Grande, Tahoma, Verdana, sans-serif");
        this.text.setAttribute("font-weight", "400");
        this.text.setAttribute("font-size", "1.2em");
        this.text.setAttribute("fill", "#FFFFFF");
        this.text.innerHTML = "0.10";
        this.symbol.appendChild(this.text);
        this.emblem = document.createElementNS(portol_svgns, "use");
        this.emblem.setAttributeNS(portol_xlinkns, "xlink:href", "#portol-charmEmb");
        this.emblem.setAttribute("x", "55");
        this.emblem.setAttribute("y", "0");
        this.symbol.appendChild(this.emblem);
        return this;
    }
    CharmSymbol.prototype.getSymbol = function() {
        return this.symbol;
    };
    function ContentInfoSymbol(attr) {
        var self = this;
        var params = attr || {};
        this.pressed = false;
        this.radius = 30;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.symbol = document.createElementNS(portol_svgns, "svg");
        this.symbol.setAttribute("viewBox", "0 0 60 60");
        this.symbol.setAttribute("width", this.width);
        this.symbol.setAttribute("height", this.height);
        this.symbol.style.position = "absolute";
        this.symbol.style.left = "0";
        this.symbol.style.top = "33%";
        this.grad = new GradPackage();
        this.symbol.appendChild(this.grad.getDefs("contentInfo"));
        this.backdrop = this.drawBackdrop();
        this.backdrop.setAttribute("fill", "url(#contentInfo-rad-gradient)");
        this.tv = this.drawTV();
        this.antennaL = this.drawLine(19.4, 10.4, 30, 21, "#00FFFF");
        this.antennaR = this.drawLine(41.6, 10.4, 30, 21, "#0000FF");
        this.dot = this.drawDot();
        this.base = this.drawBase();
        this.symbol.appendChild(this.backdrop);
        this.symbol.appendChild(this.tv);
        this.symbol.appendChild(this.base);
        this.symbol.appendChild(this.dot);
        this.symbol.appendChild(this.antennaL);
        this.symbol.appendChild(this.antennaR);
        this.symbol.onclick = params.clickHandler || self.clickAction.bind(self);
        return this;
    }
    ContentInfoSymbol.prototype.drawBackdrop = function() {
        var B = document.createElementNS(portol_svgns, "circle");
        B.setAttribute("preserveAspectRatio", "midXmidY meet");
        B.setAttribute("cx", this.radius);
        B.setAttribute("cy", this.radius);
        B.setAttribute("r", this.radius);
        B.setAttribute("fill", "#FFFFFF");
        return B;
    };
    ContentInfoSymbol.prototype.drawTV = function() {
        var TV = document.createElementNS(portol_svgns, "rect");
        TV.setAttribute("x", "10");
        TV.setAttribute("y", "21");
        TV.setAttribute("rx", "5");
        TV.setAttribute("width", "40");
        TV.setAttribute("height", "26");
        TV.setAttribute("fill", "#00FF00");
        TV.setAttribute("stroke-width", "1");
        TV.setAttribute("stroke", "#000000");
        return TV;
    };
    ContentInfoSymbol.prototype.drawLine = function(x1, y1, x2, y2, color) {
        var L = document.createElementNS(portol_svgns, "line");
        L.setAttribute("x1", x1);
        L.setAttribute("y1", y1);
        L.setAttribute("x2", x2);
        L.setAttribute("y2", y2);
        L.setAttribute("stroke", color);
        L.setAttribute("stroke-width", "2");
        return L;
    };
    ContentInfoSymbol.prototype.drawDot = function() {
        var D = document.createElementNS(portol_svgns, "circle");
        D.setAttribute("cx", 30);
        D.setAttribute("cy", 28);
        D.setAttribute("r", 4);
        D.setAttribute("fill", "#0000FF");
        return D;
    };
    ContentInfoSymbol.prototype.drawBase = function() {
        var B = document.createElementNS(portol_svgns, "rect");
        B.setAttribute("x", 26);
        B.setAttribute("y", 33);
        B.setAttribute("width", 8);
        B.setAttribute("height", 12);
        B.setAttribute("fill", "#0000FF");
        B.setAttribute("rx", "2");
        return B;
    };
    ContentInfoSymbol.prototype.getElement = function() {
        return this.symbol;
    };
    ContentInfoSymbol.prototype.getPressed = function() {
        return this.pressed;
    };
    ContentInfoSymbol.prototype.togglePressed = function(vals) {
        this.setPressed(!this.pressed);
        return this;
    };
    ContentInfoSymbol.prototype.setPressed = function(pressed) {
        this.pressed = pressed;
        return this;
    };
    ContentInfoSymbol.prototype.clickAction = function(ev) {
        ev.stopPropagation();
        this.togglePressed();
        this.triggerControlClick({
            depressed: this.pressed,
            unpressed: !this.pressed
        });
        return this;
    };
    function DollarEmblem() {
        this.symbol = document.createElementNS(portol_svgns, "symbol");
        this.symbol.setAttribute("id", "portol-dollarEmb");
        this.symbol.setAttribute("width", 100);
        this.symbol.setAttribute("height", 100);
        this.circle = document.createElementNS(portol_svgns, "circle");
        this.p1 = document.createElementNS(portol_svgns, "path");
        this.p2 = document.createElementNS(portol_svgns, "path");
        this.symbol.appendChild(this.circle);
        this.symbol.appendChild(this.p1);
        this.symbol.appendChild(this.p2);
        this.circle.setAttribute("cx", 40);
        this.circle.setAttribute("cy", 40);
        this.circle.setAttribute("r", 25);
        this.circle.setAttribute("fill", "green");
        this.p1.setAttribute("d", "m 233.72993,14.801025 30.97001,0 0,28.342438 c 43.74979,3.151313 73.84925,20.828602 90.29846,53.031922 7.70085,14.345095 11.5514,30.970295 11.55166,49.875645 l 0,0.51269 -41.48025,0 c -0.3527,-26.94825 -10.49978,-46.3719 -30.44129,-58.271026 -7.00701,-3.84488 -14.70812,-6.4671 -23.10333,-7.866669 l -6.82525,-0.528717 0,130.721282 c 35.00194,10.85225 57.57653,19.07673 67.72384,24.67346 l 1.05744,0.52872 c 29.39427,16.80162 44.26776,43.5739 44.62051,80.31693 l 0,0.52871 c -2.7e-4,36.40144 -11.89906,65.2779 -35.69641,86.62949 l -12.6091,9.45282 c -17.14346,10.14709 -38.8422,16.27272 -65.09628,18.37692 l 0,54.07333 -30.97001,0 0,-54.07333 c -53.90784,-3.50343 -88.38657,-25.73088 -103.43627,-66.68243 -5.59695,-16.09643 -7.87203,-34.29709 -6.82526,-54.60205 l 41.48025,0 c 2.44593,25.90187 6.12024,43.05579 11.02295,51.46179 l 2.09885,3.66897 c 12.2512,16.80149 30.80434,26.77768 55.65948,29.92859 l 0,-142.80166 c -32.55624,-9.80512 -54.60746,-18.90546 -66.15371,-27.30103 -24.85508,-17.84799 -37.28259,-43.22639 -37.28256,-76.13525 l 0,-0.5127 c -3e-5,-51.098309 24.50251,-84.001566 73.50769,-98.709868 9.10023,-2.798089 19.07642,-4.896933 29.92858,-6.296539 z m 0,191.619875 0,-125.994875 C 200.12694,84.97653 180.3508,100.54963 174.40147,127.14539 l -1.57013,15.74935 c -6e-5,31.49897 20.29945,52.67433 60.89859,63.52616 z m 30.97001,50.40436 0,138.07525 c 21.35144,-2.45664 37.45326,-8.93475 48.30551,-19.43435 14.69704,-13.99226 22.04567,-31.31707 22.0459,-51.97449 l 0,-0.52872 c -2.3e-4,-21.34082 -8.22471,-37.26106 -24.67347,-47.76077 -10.15797,-6.30173 -25.38393,-12.42737 -45.67794,-18.37692 z");
        this.p1.setAttribute("transform", "scale(0.08) translate(250,250)");
        this.p1.setAttribute("fill", "#FFFFFF");
        return this;
    }
    DollarEmblem.prototype.getSymbol = function() {
        return this.symbol;
    };
    function DollarIcon(standalone, price) {
        this.standalone = standalone;
        if (this.standalone) {
            this.main = document.createElementNS(portol_svgns, "svg");
            this.main.setAttribute("class", "icon");
            this.main.setAttribute("width", 130);
            this.main.setAttribute("height", 80);
            this.main.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        } else {
            this.main = document.createElementNS(portol_svgns, "g");
            this.main.setAttribute("width", 130);
            this.main.setAttribute("height", 80);
            this.main.setAttribute("viewBox", "0 0 130 80");
            this.main.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        }
        this.dollarSymbol = document.createElementNS(portol_svgns, "use");
        this.dollarSymbol.setAttributeNS(portol_xlinkns, "xlink:href", "#portol-dollarSymb");
        this.dollarSymbol.setAttribute("x", 0);
        this.dollarSymbol.setAttribute("y", 0);
        this.main.appendChild(this.dollarSymbol);
        this.main.setAttribute("id", "portol-dollarIcon");
        return this;
    }
    DollarIcon.prototype.getSVGElement = function() {
        return this.main;
    };
    function DollarSymbol() {
        this.symbol = document.createElementNS(portol_svgns, "symbol");
        this.symbol.setAttribute("id", "portol-dollarSymb");
        this.symbol.setAttribute("viewBox", "0 0 130 80");
        this.symbol.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        this.bgRect = document.createElementNS(portol_svgns, "rect");
        this.bgRect.setAttribute("width", "130");
        this.bgRect.setAttribute("height", "80");
        this.bgRect.setAttribute("fill", "#00C488");
        this.symbol.appendChild(this.bgRect);
        this.text = document.createElementNS(portol_svgns, "text");
        this.text.setAttribute("x", "20");
        this.text.setAttribute("y", "45");
        this.text.setAttribute("font-family", "Open Sans, Lucida Grande, Tahoma, Verdana, sans-serif");
        this.text.setAttribute("font-weight", "400");
        this.text.setAttribute("font-size", "1.2em");
        this.text.setAttribute("fill", "#FFFFFF");
        this.text.innerHTML = "0.10";
        this.symbol.appendChild(this.text);
        this.emblem = document.createElementNS(portol_svgns, "use");
        this.emblem.setAttributeNS(portol_xlinkns, "xlink:href", "#portol-dollarEmb");
        this.emblem.setAttribute("x", "55");
        this.emblem.setAttribute("y", "0");
        this.symbol.appendChild(this.emblem);
        return this;
    }
    DollarSymbol.prototype.getSymbol = function() {
        return this.symbol;
    };
    function GradPackage() {
        this.defs = document.createElementNS(portol_svgns, "defs");
        this.linGrad();
        this.radGrad();
        this.defs.appendChild(this.linearGradient);
        this.defs.appendChild(this.radGrad);
        return this;
    }
    GradPackage.prototype.linGrad = function() {
        this.linearGradient = document.createElementNS(portol_svgns, "linearGradient");
        this.linearGradient.setAttribute("x1", "0%");
        this.linearGradient.setAttribute("y1", "0%");
        this.linearGradient.setAttribute("x2", "100%");
        this.linearGradient.setAttribute("y2", "100%");
        this.linStop1 = document.createElementNS(portol_svgns, "stop");
        this.linStop1.setAttribute("offset", "0%");
        this.linStop1.setAttribute("style", "stop-color: #008888; stop-opacity:1");
        this.linStop2 = document.createElementNS(portol_svgns, "stop");
        this.linStop2.setAttribute("offset", "100%");
        this.linStop2.setAttribute("style", "stop-color: #00FFFF; stop-opacity:1");
        this.linearGradient.appendChild(this.linStop1);
        this.linearGradient.appendChild(this.linStop2);
        return this;
    };
    GradPackage.prototype.radGrad = function() {
        this.radGrad = document.createElementNS(portol_svgns, "radialGradient");
        this.radGrad.setAttribute("cx", "66%");
        this.radGrad.setAttribute("cy", "55%");
        this.rgStop1 = document.createElementNS(portol_svgns, "stop");
        this.rgStop1.setAttribute("offset", "0%");
        this.rgStop1.setAttribute("stop-color", "#99FFFF");
        this.rgStop1.setAttribute("stop-opacity", 1);
        this.rgStop2 = document.createElementNS(portol_svgns, "stop");
        this.rgStop2.setAttribute("offset", "100%");
        this.rgStop2.setAttribute("stop-color", "#008888");
        this.rgStop2.setAttribute("stop-opacity", .9);
        this.radGrad.appendChild(this.rgStop1);
        this.radGrad.appendChild(this.rgStop2);
        return this;
    };
    GradPackage.prototype.getDefs = function(id) {
        this.linearGradient.setAttribute("id", id + "-lin-gradient");
        this.radGrad.setAttribute("id", id + "-rad-gradient");
        return this.defs;
    };
    function PairingSymbol(attr) {
        var self = this;
        var params = attr || {};
        this.pressed = false;
        this.symbol = document.createElementNS(portol_svgns, "svg");
        this.symbol.setAttribute("viewBox", "0 0 60 60");
        this.symbol.setAttribute("width", "60");
        this.symbol.setAttribute("height", "60");
        this.symbol.style.position = "absolute";
        this.symbol.style.left = "0";
        this.symbol.style.top = "66%";
        this.circle = document.createElementNS(portol_svgns, "circle");
        this.circle.setAttribute("preserveAspectRatio", "midXmidY meet");
        this.grad = new GradPackage();
        this.symbol.appendChild(this.grad.getDefs("pairing"));
        this.symbol.appendChild(this.circle);
        this.cx = 30;
        this.cy = 30;
        this.r = 30;
        this.startAngle = 45;
        this.endAngle = -45;
        this.focalX = this.cx;
        this.focalY = 52;
        this.sigPaths = [];
        this.circle.setAttribute("cx", this.cx);
        this.circle.setAttribute("cy", this.cy);
        this.circle.setAttribute("r", this.r);
        this.circle.setAttribute("fill", "url(#pairing-rad-gradient)");
        this.spacing = [ 5, 12, 20, 28, 36 ];
        this.colors = [ "#440000", "#442200", "#336622", "#118800", "#00AA88" ];
        this.buildBars();
        this.symbol.onclick = params.clickHandler || self.clickAction.bind(self);
        return this;
    }
    PairingSymbol.prototype.buildBars = function() {
        for (var i = 0; i < this.spacing.length; i++) {
            this.sigPaths[i] = this.buildArc(this.spacing[i], this.colors[i]);
            this.symbol.appendChild(this.sigPaths[i]);
        }
        return this;
    };
    PairingSymbol.prototype.buildArcPath = function(radius) {
        var startAngle = this.startAngle;
        var endAngle = this.endAngle;
        var focX = this.focalX;
        var focY = this.focalY;
        var start = this.polarToCartesian(focX, focY, radius, startAngle);
        var end = this.polarToCartesian(focX, focY, radius, endAngle);
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        var d = [ "M", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y ].join(" ");
        return d;
    };
    PairingSymbol.prototype.buildArc = function(radius, color) {
        var path = document.createElementNS(portol_svgns, "path");
        var d = this.buildArcPath(radius);
        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", "4");
        return path;
    };
    PairingSymbol.prototype.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
        };
    };
    PairingSymbol.prototype.describeArc = function(x, y, radius, startAngle, endAngle) {
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        var d = [ "M", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y ].join(" ");
        return d;
    };
    PairingSymbol.prototype.getElement = function() {
        return this.symbol;
    };
    PairingSymbol.prototype.getPressed = function() {
        return this.pressed;
    };
    PairingSymbol.prototype.togglePressed = function(vals) {
        this.setPressed(!this.pressed);
        return this;
    };
    PairingSymbol.prototype.setPressed = function(pressed) {
        this.pressed = pressed;
        return this;
    };
    PairingSymbol.prototype.clickAction = function(ev) {
        ev.stopPropagation();
        this.togglePressed();
        this.triggerControlClick({
            depressed: this.pressed,
            unpressed: !this.pressed
        });
        return this;
    };
    function Portol_SVGSymbolContainer() {
        this.contSVG = document.createElementNS(portol_svgns, "symbol");
        document.body.appendChild(this.contSVG);
        this.contSVG.width = 100;
        this.contSVG.height = 100;
        this.contSVG.setAttribute("style", "display: none;");
        this.contSVG.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        var btcEmblem = new BtCEmblem();
        var dollarEmblem = new DollarEmblem();
        var charmEmblem = new CharmEmblem();
        this.contSVG.appendChild(btcEmblem.getSymbol());
        this.contSVG.appendChild(dollarEmblem.getSymbol());
        this.contSVG.appendChild(charmEmblem.getSymbol());
        var btcSymbol = new BtCSymbol();
        this.contSVG.appendChild(btcSymbol.getSymbol());
        var dollarSymbol = new DollarSymbol();
        this.contSVG.appendChild(dollarSymbol.getSymbol());
        var charmSymbol = new CharmSymbol();
        this.contSVG.appendChild(charmSymbol.getSymbol());
        return this;
    }
    function PriceScroll(width, height, prices) {
        this.prices = prices;
        this.width = width;
        this.height = height;
        this.contSVG = document.createElementNS(portol_svgns, "svg");
        this.contSVG.setAttribute("id", "portol-ps");
        this.contSVG.setAttribute("width", this.width);
        this.contSVG.setAttribute("height", this.height);
        this.contSVG.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        this.charmIcon = new CharmIcon(false, prices.shardPrice);
        this.dollarIcon = new DollarIcon(false, prices.priceInCents);
        this.btcIcon = new BtCIcon(false, prices.priceInBits);
        this.left = this.charmIcon.getSVGElement();
        this.middle = this.dollarIcon.getSVGElement();
        this.right = this.btcIcon.getSVGElement();
        this.placePanel(this.left, -1);
        this.placePanel(this.middle, 0);
        this.placePanel(this.right, 1);
        this.contSVG.appendChild(this.btcIcon.getSVGElement());
        this.contSVG.appendChild(this.dollarIcon.getSVGElement());
        this.contSVG.appendChild(this.charmIcon.getSVGElement());
        var lId = "#" + this.left.getAttribute("id");
        var mId = "#" + this.middle.getAttribute("id");
        var rId = "#" + this.right.getAttribute("id");
        this.element = this.contSVG;
        return this;
    }
    PriceScroll.prototype.getElement = function() {
        return this.contSVG;
    };
    PriceScroll.prototype.placePanel = function(panel, spot) {
        var placer = -spot * this.width;
        panel.setAttribute("transform", "translate(" + placer + ", 0)");
        return this;
    };
    PriceScroll.prototype.smilRotation = function() {
        this.toLeftAnimation();
    };
    PriceScroll.prototype.toLeftAnimation = function() {
        var ani = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
        ani.setAttribute("attributeName", "transform");
        ani.setAttribute("attributeType", "xml");
        ani.setAttribute("type", "translate");
        ani.setAttribute("from", "0 0");
        ani.setAttribute("to", -this.width + " 0");
        ani.setAttribute("begin", "0s");
        ani.setAttribute("dur", "3s");
        ani.setAttribute("fill", "freeze");
        this.ani = ani;
        this.middle.appendChild(this.ani);
        return this;
    };
    PriceScroll.prototype.jumpRightAnimation = function() {
        var ani = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
        ani.setAttribute("attributeName", "transform");
        ani.setAttribute("attributeType", "xml");
        ani.setAttribute("type", "translate");
        ani.setAttribute("from", "0 0");
        ani.setAttribute("to", -this.width + " 0");
        ani.setAttribute("begin", "0s");
        ani.setAttribute("dur", "3s");
        ani.setAttribute("fill", "freeze");
        this.ani = ani;
        this.middle.appendChild(this.ani);
        return this;
    };
    PriceScroll.prototype.toCenterAnimation = function() {
        var ani = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
        ani.setAttribute("attributeName", "transform");
        ani.setAttribute("attributeType", "xml");
        ani.setAttribute("type", "translate");
        ani.setAttribute("from", "0 0");
        ani.setAttribute("to", -this.width + " 0");
        ani.setAttribute("begin", "0s");
        ani.setAttribute("dur", "3s");
        ani.setAttribute("fill", "freeze");
        this.ani = ani;
        this.middle.appendChild(this.ani);
        return this;
    };
    PriceScroll.prototype.toMiddleAnimation = function() {
        var ani = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
        ani.setAttribute("attributeName", "transform");
        ani.setAttribute("attributeType", "xml");
        ani.setAttribute("type", "translate");
        ani.setAttribute("from", this.width + " 0");
        ani.setAttribute("to", "0 0");
        ani.setAttribute("begin", "0s");
        ani.setAttribute("dur", "3s");
        ani.setAttribute("fill", "freeze");
        this.ani = ani;
        this.right.appendChild(this.ani);
        return this;
    };
    PriceScroll.prototype.bad_toLeftAnimation = function() {
        var ani = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        ani.setAttribute("attributeName", "x");
        ani.setAttribute("attributeType", "xml");
        ani.setAttribute("begin", "0s");
        ani.setAttribute("from", "0");
        ani.setAttribute("repeatCount", "1");
        var w = -this.width;
        ani.setAttribute("to", w.toString());
        ani.setAttribute("dur", "10s");
        this.ani = ani;
        this.middle.appendChild(this.ani);
        return this;
    };
    PriceScroll.prototype.bad_toMiddleAnimation = function() {
        var ani = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        ani.setAttribute("attributeName", "x");
        ani.setAttribute("attributeType", "xml");
        ani.setAttribute("begin", "0s");
        ani.setAttribute("from", this.width);
        ani.setAttribute("repeatCount", "1");
        ani.setAttribute("to", "0");
        ani.setAttribute("dur", "3s");
        this.ani = ani;
        this.right.appendChild(this.ani);
        return this;
    };
    PriceScroll.prototype.jumpRight = function() {
        this.left.setAttribute("transform", "translate(" + this.width + ", 0)");
        return this;
    };
    PriceScroll.prototype.reassignPos = function() {
        var l = this.middle;
        var m = this.right;
        var r = this.left;
        this.left = l;
        this.middle = m;
        this.right = r;
        return this;
    };
    PriceScroll.prototype.javascriptMove = function() {
        this.toLeftAnimation().toMiddleAnimation().jumpRight().reassignPos();
        return this;
    };
    function RatingBar(attrs) {
        this.totWidth = 100;
        this.height = 20;
        this.start = [];
        this.badVal = attrs.badVal;
        this.neitherVal = attrs.neitherVal;
        this.goodVal = attrs.goodVal;
        this.symbol = document.createElementNS(portol_svgns, "svg");
        this.symbol.setAttribute("id", "portol-ratingBar");
        this.buildBar();
        this.bad = document.createElementNS(portol_svgns, "rect");
        this.neither = document.createElementNS(portol_svgns, "rect");
        this.good = document.createElementNS(portol_svgns, "rect");
        this.symbol.appendChild(this.bad);
        this.bad.setAttribute("height", "100%");
        this.bad.setAttribute("width", this.badVal);
        this.bad.setAttribute("x", 0);
        this.bad.setAttribute("y", 0);
        this.bad.setAttribute("fill", "#FF0000");
        this.symbol.appendChild(this.neither);
        this.neither.setAttribute("height", "100%");
        this.neither.setAttribute("width", this.neitherVal);
        this.neither.setAttribute("x", this.badVal + 1);
        this.neither.setAttribute("y", 0);
        this.neither.setAttribute("fill", "#999999");
        this.symbol.appendChild(this.good);
        this.good.setAttribute("height", "100%");
        this.good.setAttribute("width", this.goodVal);
        this.good.setAttribute("x", this.badVal + 1 + this.neitherVal + 1);
        this.good.setAttribute("y", 0);
        this.good.setAttribute("fill", "#00FF00");
        return this;
    }
    RatingBar.prototype.buildBar = function(attrs) {
        this.symbol.setAttribute("width", this.totWidth);
        this.symbol.setAttribute("height", this.height);
        this.symbol.setAttribute("viewPort", [ this.totWidth, this.height ].join(" "));
        return this;
    };
    RatingBar.prototype.getSymbol = function() {
        console.log("rating bar symbol", this.symbol);
        return this.symbol;
    };
    RatingBar.prototype.getElement = function() {
        console.log("Called getElement for ratingBar when getSymbol should be called.");
        return this.getSymbol();
    };
    function BackToProgram() {
        this.element = document.getElementById("back-to-program");
        this.current = "hidden-bar";
        return this;
    }
    BackToProgram.prototype.freeze = function() {
        if (this.current != "available-bar") {
            this.element.classList.add("available-bar");
            this.element.classList.remove("hidden-bar");
            this.current = "available-bar";
        }
        return this;
    };
    BackToProgram.prototype.underlay = function() {
        if (this.current != "hidden-bar") {
            this.element.classList.add("hidden-bar");
            this.element.classList.remove("available-bar");
            this.current = "hidden-bar";
        }
        return this;
    };
    BackToProgram.prototype.update = function(metrics) {
        if (metrics.carousel.scrollTop >= metrics.panels.pairing.offsetTop) {
            this.freeze();
        } else {
            this.underlay();
        }
        return this;
    };
    function ButtonTemplate(params) {
        params = params || {};
        this.pressed = params.pressed || false;
        this.label = params.label || "My Label";
        this.circles = params.circles || [];
        this.unpressedColor = "#008888";
        this.pressedColor = "#00C488";
        this.buildElement();
        this.buildSVGElement();
        return this;
    }
    ButtonTemplate.prototype.buildElement = function(params) {
        var self = this;
        this.element = document.createElement("div");
        params = params || {
            label: this.label,
            pressed: this.pressed
        };
        this.label = params.label;
        this.pressed = params.pressed;
        var s = this.element.style;
        s.display = "inline-block";
        s.background = this.pressed ? this.pressedColor : this.unpressedColor;
        s.border = "none";
        s.width = "25%";
        s.height = "100%";
        s.fontWeight = "600";
        s.fontSize = "1.5em";
        s.letterSpacing = "1px";
        s.textTransform = "uppercase";
        s.color = "#FFFFFF";
        s.outline = "none";
        s.textAlign = "center";
        s["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
        s["-webkit-tap-highlight-color"] = "transparent";
        s.overflow = "hidden";
        s["-webkit-backface-visibility"] = "hidden";
        s["-moz-backface-visibility"] = "hidden";
        s["backface-visibility"] = "hidden";
        var text = document.createElement("span");
        text.innerHTML = this.label;
        this.element.appendChild(text);
        this.element.onclick = params.clickHandler || self.clickAction.bind(self);
        pgStyleUtils.noSelect(this.element);
        this.addCircleSVG();
        return this;
    };
    ButtonTemplate.prototype.buildSVGElement = function(params) {
        var self = this;
        params = params || {
            label: this.label,
            pressed: this.pressed
        };
        this.label = params.label;
        this.pressed = params.pressed;
        this.svgContainer = document.createElement("div");
        var s = this.svgContainer.style;
        s.display = "inline-block";
        s.width = "25%";
        s.height = "100%";
        this.mWidth = 100;
        this.mHeight = 100;
        this.mSnap = Snap(this.mWidth + "%", this.mHeight + "%");
        this.rect = this.mSnap.rect(0, 0, "100%", this.mHeight + "%");
        this.rect.attr({
            fill: this.pressed ? this.pressedColor : this.unpressedColor
        });
        this.rect.node.onclick = params.clickHandler || self.clickAction.bind(self);
        this.mSnap.append(this.rect);
        this.svgContainer.appendChild(this.mSnap.node);
        this.attachIcon();
        pgStyleUtils.noSelect(this.svgContainer);
        return this;
    };
    ButtonTemplate.prototype.getElement = function() {
        return this.svgContainer || this.element;
    };
    ButtonTemplate.prototype.getPressed = function() {
        return this.pressed;
    };
    ButtonTemplate.prototype.togglePressed = function(vals) {
        this.setPressed(!this.pressed);
        this.element.style.backgroundColor = this.pressed ? this.pressedColor : this.unpressedColor;
        return this;
    };
    ButtonTemplate.prototype.setPressed = function(pressed) {
        this.pressed = pressed;
        return this;
    };
    ButtonTemplate.prototype.clickAction = function() {
        this.togglePressed();
        this.triggerControlClick({
            depressed: this.pressed,
            unpressed: !this.pressed
        });
        return this;
    };
    ButtonTemplate.prototype.addCircles = function() {
        var circles = this.circles;
        for (var ctr = 0; ctr < circles.length; ctr++) {
            if (ctr === 0) {
                this.element.appendChild(document.createElement("br"));
            }
            var c = circles[ctr];
            var d;
            switch (c.type) {
              case "img":
                d = document.createElement("img");
                d.src = c.icon;
                break;

              case "text":
                d = document.createElement("span");
                d.innerHTML = c.label;
                break;
            }
            pgStyleUtils.makeCircular(d, c.radius);
            this.element.appendChild(d);
            d.onclick = c.click.bind(c);
        }
        return this;
    };
    ButtonTemplate.prototype.addCircleSVG = function() {
        var radius = 20;
        var mSnap = Snap(radius * 2, radius * 2);
        var circle = mSnap.circle(radius, radius, radius);
        circle.node.onclick = function(e) {
            alert("Circle Click");
            e.stopPropagation();
        };
        mSnap.append(circle);
        this.element.appendChild(document.createElement("br"));
        this.element.appendChild(mSnap.node);
        return this;
    };
    ButtonTemplate.prototype.attachIcon = function() {
        this.icon = this.mSnap.circle("50%", "50%", "30%");
        this.icon.attr({
            fill: "#888888",
            stroke: "#999999"
        });
        this.circleText = this.mSnap.text("50%", "50%", ">");
        this.circleText.attr({
            stroke: "#FFFFFF"
        });
        this.mSnap.append(this.icon);
        this.mSnap.append(this.circleText);
        return this;
    };
    function GradientBackdrop(parentElement) {
        this.element = document.createElement("canvas");
        this.parentElement = parentElement;
        this.parentElement.appendChild(this.element);
        return this;
    }
    GradientBackdrop.prototype.initialize = function(attrs) {
        this.buildElement(attrs);
        return this;
    };
    GradientBackdrop.prototype.buildElement = function(attrs) {
        this.color = attrs.color;
        var s = this.element.style;
        s.position = "absolute";
        s.width = this.parentElement.style.width;
        s.height = this.parentElement.style.height;
        s.left = "0px";
        s.top = "0px";
        s.display = "inline-block";
        s.backgroundSize = "cover";
        s.backgroundRepeat = "no-repeat";
        s.alignText = "left";
        this.canvasContext = this.element.getContext("2d");
        console.log("element width", this.element.width);
        var grd = this.canvasContext.createLinearGradient(0, 0, this.element.width, 0);
        grd.addColorStop(0, "rgba(50,50,100,0.9)");
        grd.addColorStop(1, "rgba(220,220,255,0.1)");
        this.canvasContext.fillStyle = grd;
        console.log("element style", this.element.style.width);
        this.canvasContext.fillRect(0, 0, this.element.width, this.element.height);
        return this;
    };
    GradientBackdrop.prototype.getElement = function() {
        return this.element || this.buildElement().element;
    };
    GradientBackdrop.prototype.setParentBackground = function() {
        this.parentElement.style.backgroundImage = "url('" + this.element.toDataURL() + "')";
        return this;
    };
    function PanelContainer(attrs) {
        var a = attrs || {};
        this.name = a.name || null;
        this.panel = a.panel || null;
        this.elementId = a.elementId || null;
        this.element = document.getElementById(this.elementId);
    }
    PanelContainer.prototype.getTopPosition = function() {
        return this.element.offsetTop;
    };
    PanelContainer.prototype.getClientHeight = function() {
        return this.element.clientHeight;
    };
    function PanelDeck(panels) {
        this.contains = [];
        return this;
    }
    PanelDeck.prototype.popOffTop = function() {
        var toPop = this.contains.pop();
        return toPop;
    };
    PanelDeck.prototype.popOffBottom = function() {
        var toPop = this.contains.shift();
        return toPop;
    };
    PanelDeck.prototype.pushToTop = function(toPush) {
        this.contains.push(toPush);
        return this;
    };
    PanelDeck.prototype.pushToBottom = function(toPush) {
        this.contains.unshift(toPush);
        return this;
    };
    PanelDeck.prototype.getCount = function() {
        return this.contains.length;
    };
    PanelDeck.prototype.getSome = function(n) {
        if (typeof n != "number" || n < 0) {
            return null;
        }
        var pulled = [];
        for (var i = 0; i < n; i++) {
            pulled.push(this.popOffTop());
        }
        return pulled;
    };
    function PanelsCarousel(panels) {
        this.element = document.body;
        this.videoInfo = panels.videoInfo;
        this.pairing = panels.pairing;
        this.account = panels.account;
        this.portolInfo = panels.portolInfo;
        this.player = panels.player;
        this.shimGradient = new ShimGradient();
        this.backToProgram = new BackToProgram();
    }
    PanelsCarousel.prototype.createObservableScroll = function() {
        this.element.addEventListener("scroll", this.announceScroll.bind(this));
        return this;
    };
    PanelsCarousel.prototype.observeScroll = function() {
        var self = this;
        var metric = {
            panels: {
                videoInfo: {},
                pairing: {},
                account: {},
                portolInfo: {},
                player: {}
            },
            carousel: {}
        };
        metric.carousel.scrollTop = this.element.scrollTop;
        metric.carousel.height = this.element.clientHeight;
        metric.carousel.viewWindow = {
            top: metric.carousel.scrollTop,
            bottom: metric.carousel.scrollTop + metric.carousel.height
        };
        var modules = Object.keys(metric.panels);
        var ctr = 0;
        for (ctr = 0; ctr < modules.length; ctr++) {
            var panelName = modules[ctr];
            var target = metric.panels[panelName];
            target.offsetTop = self[panelName].getTopPosition();
            target.clientHeight = self[panelName].getClientHeight();
            target.viewWindow = {
                top: target.offsetTop,
                bottom: target.offsetTop + target.clientHeight
            };
            if (target.viewWindow.top >= metric.carousel.viewWindow.top && target.offsetTop < metric.carousel.viewWindow.bottom) {
                target.inFocus = true;
            } else {
                target.inFocus = false;
            }
        }
        return metric;
    };
    PanelsCarousel.prototype.announceScroll = function() {
        var observed = this.observeScroll();
        this.shimGradient.update(observed);
        this.backToProgram.update(observed);
        this.triggerObservableScroll(observed);
        return this;
    };
    PanelsCarousel.prototype.jumpToPanel = function(panel) {
        this.element.scrollTop = panel.getElement().top;
        return this;
    };
    PanelsCarousel.prototype.rotateCarousel = function(focus) {
        var self = this;
        if (!self.hasOwnProperty(focus)) {
            console.log("Bad carousel rotate: ", focus);
            return this;
        }
        var target = self[focus];
        this.startScroll(target);
        return this;
    };
    PanelsCarousel.prototype.onstartVideo = function() {
        $.fn.fullpage.silentMoveTo("playerPage");
        return this;
    };
    PanelsCarousel.prototype.stopCurrentAnimation = function() {
        var self = this;
        if (this.currentAnimation) {
            window.clearInterval(this.currentAnimation);
        }
        enableScroll();
        return this;
    };
    PanelsCarousel.prototype.stopAnimationOnScroll = function() {
        var self = this;
        this.element.addEventListener("scroll", self.stopCurrentAnimation.bind(self));
        return this;
    };
    PanelsCarousel.prototype.startScroll = function(target) {
        this.expectedScrollPosition = this.element.scrollTop;
        return this;
    };
    PanelsCarousel.prototype.parallaxScroll = function(target, carousel) {
        var self = this;
        var USER_SCROLL = 2 < Math.abs(this.expectedScrollPosition - this.element.scrollTop);
        var STOP_ANIMATION = false;
        if (USER_SCROLL || STOP_ANIMATION) {
            return;
        }
        var STEP_TIME = 20;
        var SMOOTH_LANDING = 10;
        var CLOSE_ENOUGH = 2;
        var difference = this.element.scrollTop - target.getTopPosition();
        var sign = difference < 0 ? -1 : 1;
        var percentChange = 10;
        var delta = 0;
        if (Math.abs(difference) < CLOSE_ENOUGH) {
            delta = null;
        } else if (Math.abs(difference) < SMOOTH_LANDING) {
            delta = 1 * sign;
        } else {
            delta = difference / percentChange;
        }
        if (delta) {
            this.expectedScrollPosition = this.element.scrollTop - delta;
            this.element.scrollTop = this.expectedScrollPosition;
            this.currentAnimation = window.setTimeout(self.parallaxScroll.bind(self, target), STEP_TIME);
        } else {
            STOP_ANIMATION = true;
            this.element.scrollTop = target.getTopPosition();
            this.stopCurrentAnimation();
        }
        return this;
    };
    PanelsCarousel.prototype.onrotateCarousel = function(panelName) {
        this.rotateCarousel(panelName);
        return this;
    };
    function RawImage(attrs) {
        var a = attrs || {};
        this.type = a.type || null;
        this.rawData = a.rawData || null;
        this.description = a.description || null;
        return this;
    }
    RawImage.prototype.doRender = function() {
        this.element.src = "data:" + this.type + ";base64," + this.rawData;
        return this;
    };
    function ShimGradient(parentElement) {
        this.element = document.getElementById("shim-gradient");
        this.current = "underlay";
        return this;
    }
    ShimGradient.prototype.freeze = function() {
        if (this.current != "frozen") {
            this.element.classList.add("frozen");
            this.element.classList.remove("underlay");
            this.current = "frozen";
        }
        return this;
    };
    ShimGradient.prototype.underlay = function() {
        if (this.current != "underlay") {
            this.element.classList.add("underlay");
            this.element.classList.remove("frozen");
            this.current = "underlay";
        }
        return this;
    };
    ShimGradient.prototype.update = function(metric) {
        if (metric.carousel.scrollTop >= metric.carousel.height) {
            this.underlay();
        } else {
            this.freeze();
        }
        return this;
    };
    function SplashModule(context) {
        this.screenElement = document.body;
        this.god = {};
        this.initialize(context);
        this.eventBus.subscribe(this, [ "playerBuyRequest", "previewRequest", "favoriteRequest", "bookmarkDeleteRequest" ]);
        return this;
    }
    SplashModule.prototype.initialize = function(synchronizedStates) {
        this.svgs = new Portol_SVGSymbolContainer();
        this.accountState = synchronizedStates.accountState;
        this.playerState = synchronizedStates.playerState;
        this.pairingState = synchronizedStates.pairingState;
        this.userModule = new UserInfoContainer(synchronizedStates.accountState);
        this.userModule.initialize();
        this.videoModule = new VideoInfoContainer(synchronizedStates.playerState);
        this.videoModule.initialize();
        this.pairingModule = new PairingContainer(synchronizedStates.pairingState);
        this.pairingModule.initialize();
        this.portolModule = new PortolContainer();
        this.portolModule.initialize();
        this.buildElement();
        this.eventBus = new EventBus([ "clickrAdded", "videoChange", "previewRequest", "favoriteRequest", "bookmarkDeleteRequest", "rotateCarousel", "observableScroll" ]);
        this.mapEvents().grantRights();
        this.eventBus.subscribe(this, [ "observableScroll" ]);
        return this;
    };
    SplashModule.prototype.grantRights = function() {
        var self = this;
        this.videoModule.triggerPreviewRequest = this.eventBus.trigger.bind(this.eventBus, "previewRequest");
        this.videoModule.triggerFavoriteRequest = this.eventBus.trigger.bind(this.eventBus, "favoriteRequest");
        this.videoModule.triggerBookmarkDeleteRequest = this.eventBus.trigger.bind(this.eventBus, "bookmarkDeleteRequest");
        this.god.triggerVanish = this.eventBus.trigger.bind(this.eventBus, "vanish");
        return this;
    };
    SplashModule.prototype.mapEvents = function() {
        this.eventBus.subscribe(this.pairingModule, [ "clickrAdded" ]);
        this.eventBus.subscribe(this.videoModule, [ "videoChange" ]);
        this.eventBus.subscribe(this.shimGradient, [ "observableScroll" ]);
        return this;
    };
    SplashModule.prototype.oninitSplash = function(splashParams) {
        this.initialize(splashParams).buildElement();
        return this;
    };
    SplashModule.prototype.buildElement = function() {
        this.buildScreenElement();
        return this;
    };
    SplashModule.prototype.buildScreenElement = function() {
        var defaultImage = "img/theater.jpg";
        var bg = this.playerState.metaData.splashURL || defaultImage;
        console.log("background image,", bg);
        this.backdropElement = document.createElement("img");
        this.backdropElement.id = "theme-backdrop";
        this.backdropElement.classList.add("fixed-backdrop");
        this.backdropElement.src = bg;
        var target = document.getElementById("video-info-panel");
        target.insertBefore(this.backdropElement, target.firstChild);
        return this;
    };
    SplashModule.prototype.onstartVideo = function() {
        this.backdropElement.classList.add("dimming-gradient");
        document.getElementById("shim-gradient").classList.add("dimmed");
        return this;
    };
    SplashModule.prototype.onportolSSE = function(data) {
        console.log("Splash module saw portolSSE");
        return this;
    };
    SplashModule.prototype.onplayerBuyRequest = function() {
        this.triggerPlayerBuyRequest();
        return this;
    };
    SplashModule.prototype.onpreviewRequest = function() {
        this.triggerPreviewRequest();
        return this;
    };
    SplashModule.prototype.onfavoriteRequest = function() {
        this.triggerFavoriteRequest();
        return this;
    };
    SplashModule.prototype.onbookmarkDeleteRequest = function() {
        this.triggerBookmarkDeleteRequest();
        return this;
    };
    SplashModule.prototype.getPanels = function() {
        return {
            videoInfo: this.videoModule,
            account: this.userModule,
            pairing: this.pairingModule,
            portolInfo: this.portolModule
        };
    };
    function UserInfoContainer(accountState) {
        PanelContainer.call(this, {
            name: "accountPanel",
            panel: "account",
            elementId: "account-panel"
        });
        this.accountState = accountState;
        return this;
    }
    UserInfoContainer.prototype = Object.create(PanelContainer.prototype);
    UserInfoContainer.prototype.constructor = UserInfoContainer;
    UserInfoContainer.prototype.displayUser = function(userParams) {
        this.isLoggedIn = true;
        this.username = new Username(userParams.userName);
        console.log("userParams", userParams);
        this.funds = new Funds(userParams.funds);
        this.userImg = new UserImg(userParams.userImg);
        this.eventBus = new EventBus();
        this.grantRights().mapEvents();
        this.accountButtonIcon = document.getElementById("account-button-icon");
        var myName = document.getElementById("account-button-label");
        myName.innerHTML = this.username.getName();
        var iconRaw = new RawImage(userParams.userImg);
        iconRaw.element = document.getElementById("account-button-icon-image");
        iconRaw.doRender();
        this.accountButtonIcon.appendChild(iconRaw.element);
        iconRaw.element.classList.add("control-icon");
        iconRaw.element.classList.add("normal");
        document.getElementById("logged-in").classList.remove("hidden-container");
        document.getElementById("login-options-container").classList.add("hidden-container");
        return this;
    };
    UserInfoContainer.prototype.initialize = function() {
        var userParams = this.accountState.getStateObject();
        console.log(userParams);
        if (userParams.userName !== null) {
            this.displayUser(userParams);
        } else {
            this.displayGeneric(userParams);
        }
    };
    UserInfoContainer.prototype.displayGeneric = function() {
        console.log("Displaying generic info.");
        document.getElementById("logged-in").classList.add("hidden-container");
        document.getElementById("login-options-container").classList.remove("hidden-container");
        this.loginButton = new PopupLogin();
        return this;
    };
    UserInfoContainer.prototype.onsettingsPress = function() {
        return this;
    };
    UserInfoContainer.prototype.grantRights = function() {
        return this;
    };
    UserInfoContainer.prototype.mapEvents = function() {
        this.eventBus.subscribe(this.panel, [ "controlClick" ]);
        this.accountState.stateEventBus.subscribe(this, [ "newUser" ]);
        return this;
    };
    UserInfoContainer.prototype.getPanelElement = function() {
        return this.panel.getElement();
    };
    function Funds(attrs) {
        this.element = document.getElementById("user-balance");
        this.initialize(attrs).buildElement();
        return this;
    }
    Funds.prototype.initialize = function(attrs) {
        attrs = attrs || {};
        this.charms = attrs.userCredits || null;
        this.cents = attrs.userBits || null;
        return this;
    };
    Funds.prototype.formatMoney = function(c, d, t) {
        var n = this.charms / 100;
        c = isNaN(c = Math.abs(c)) ? 2 : c;
        d = d || ".";
        t = t || ",";
        var s = n < 0 ? "-" : "";
        var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
        var j = (j = i.length) > 3 ? j % 3 : 0;
        return "$" + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    Funds.prototype.buildElement = function() {
        var formatted = this.formatMoney(2, ".", ",");
        this.element.innerHTML = formatted;
        return this;
    };
    Funds.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function PopupLogin(attrs) {
        this.element = document.getElementById("login-button");
        this.windowReference = null;
        this.initialize(attrs);
        return this;
    }
    PopupLogin.prototype.initialize = function(attrs) {
        attrs = attrs || {};
        var self = this;
        this.element.addEventListener("click", self.doPopup.bind(self));
        return this;
    };
    PopupLogin.prototype.doPopup = function() {
        var strWindowFeatures = "location=no,resizable=no,scrollbars=no,status=yes,width=400,height=350";
        this.windowReference = windowObjectReference = window.open("https://www.portol.me:5555/loginOrRegister.html", "Portol Secure Login", strWindowFeatures);
        return this;
    };
    PopupLogin.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function UserImg(attrs) {
        RawImage.call(this, {
            type: attrs.type,
            description: attrs.description,
            rawData: attrs.rawData
        });
        var a = attrs || {};
        this.element = document.getElementById("user-pic");
        this.doRender();
        return this;
    }
    UserImg.prototype = Object.create(RawImage.prototype);
    UserImg.prototype.constructor = UserImg;
    function Username(userName) {
        this.element = document.getElementById("user-name");
        this.userName = userName;
        this.initialize();
        return this;
    }
    Username.prototype.initialize = function() {
        this.buildElement();
        return this;
    };
    Username.prototype.getName = function() {
        return this.userName;
    };
    Username.prototype.buildElement = function() {
        this.element.innerHTML = this.userName;
        return this;
    };
    Username.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function ChannelInfo(attrs) {
        this.element = document.getElementById("channel-information");
        this.initialize(attrs).buildElement();
        return this;
    }
    ChannelInfo.prototype.initialize = function(attrs) {
        attrs = attrs || {};
        this.channelName = new ChannelName(attrs.name);
        this.channelDescription = new ChannelDescription(attrs.description);
        return this;
    };
    ChannelInfo.prototype.buildElement = function() {
        return this;
    };
    ChannelInfo.prototype.getElement = function() {
        return this.element || this.buildElement().element;
    };
    function VideoInfoContainer(playerState) {
        PanelContainer.call(this, {
            name: "videoInfoPanel",
            panel: "videoInfo",
            elementId: "video-panel"
        });
        this.playerState = playerState;
        this.element = document.getElementById("video-info-panel");
    }
    VideoInfoContainer.prototype = Object.create(PanelContainer.prototype);
    VideoInfoContainer.prototype.constructor = VideoInfoContainer;
    VideoInfoContainer.prototype.initialize = function() {
        var attrs = this.playerState.metaData || {};
        console.log("metaData", attrs);
        this.videoTitle = new VideoTitle(attrs.currentTitle);
        this.videoDescription = new VideoDescription(attrs.info);
        this.videoRating = new VideoRating(attrs.rating);
        this.videoCreator = new VideoCreator(attrs.creatorInfo);
        this.price = new Price(attrs.prices);
        this.channelInfo = new ChannelInfo({
            name: attrs.channelName,
            description: attrs.channelDescription
        });
        this.eventBus = new EventBus();
        this.mapEvents().grantRights();
        return this;
    };
    VideoInfoContainer.prototype.grantRights = function() {
        return this;
    };
    VideoInfoContainer.prototype.mapEvents = function() {
        this.eventBus.subscribe(this, [ "previewRequest", "playerBuyRequest", "favoriteRequest", "bookmarkDeleteRequest", "changeFocus" ]);
        return this;
    };
    VideoInfoContainer.prototype.getButtonElement = function() {
        return this.controlButton.getElement();
    };
    VideoInfoContainer.prototype.getElement = function() {
        return this.element;
    };
    VideoInfoContainer.prototype.getChannelElement = function() {
        return this.channelInfo.getElement();
    };
    VideoInfoContainer.prototype.onplayerBuyRequest = function() {
        this.triggerPlayerBuyRequest();
        return this;
    };
    VideoInfoContainer.prototype.onfavoriteRequest = function() {
        this.triggerFavoriteRequest();
        return this;
    };
    VideoInfoContainer.prototype.onpreviewRequest = function() {
        this.triggerPreviewRequest();
        return this;
    };
    VideoInfoContainer.prototype.onbookmarkDeleteRequest = function() {
        this.triggerBookmarkDeleteRequest();
        return this;
    };
    VideoInfoContainer.prototype.onrotateCarousel = function(focus) {
        this.triggerChangeFocus(focus);
        return this;
    };
    function BookmarkButton(attrs) {
        this.element = document.getElementById("bookmark-button");
        this.initialize(attrs);
        return this;
    }
    BookmarkButton.prototype.initialize = function(attrs) {
        attrs = attrs || {};
        this.attachClickHandler();
        return this;
    };
    BookmarkButton.prototype.attachClickHandler = function() {
        var self = this;
        this.element.addEventListener("click", function() {
            self.triggerBookmarkRequest();
        });
        return this;
    };
    BookmarkButton.prototype.getElement = function() {
        return this.element;
    };
    function ChannelDescription(attrs) {
        this.element = document.getElementById("channel-description");
        this.initialize(attrs).buildElement();
        return this;
    }
    ChannelDescription.prototype.initialize = function(attrs) {
        attrs = attrs || {};
        this.description = attrs.description || "Wow this is an interesting channel. Channel description test.";
        return this;
    };
    ChannelDescription.prototype.buildElement = function() {
        this.element.innerHTML = this.description;
        return this;
    };
    ChannelDescription.prototype.getElement = function() {
        return this.element || this.buildElement().element;
    };
    function ChannelName(name) {
        this.element = document.getElementById("channel-name");
        this.initialize(name).buildElement();
        return this;
    }
    ChannelName.prototype.initialize = function(name) {
        this.name = name || "Great Channel Name";
        return this;
    };
    ChannelName.prototype.buildElement = function() {
        this.element.innerHTML = this.name;
        return this;
    };
    ChannelName.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function Price(attrs) {
        this.element = document.getElementById("price-scroll");
        this.initialize(attrs).buildElement();
        return this;
    }
    Price.prototype.initialize = function(attrs) {
        attrs = attrs || {};
        this.btc = attrs.priceInBits || null;
        this.cents = attrs.priceInCents || null;
        this.charms = attrs.shardPrice || null;
        return this;
    };
    Price.prototype.formatMoney = function(c, d, t) {
        var n = this.cents / 100;
        c = isNaN(c = Math.abs(c)) ? 2 : c;
        d = d || ".";
        t = t || ",";
        var s = n < 0 ? "-" : "";
        var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
        var j = (j = i.length) > 3 ? j % 3 : 0;
        return "$" + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    Price.prototype.buildElement = function() {
        var formatted = this.formatMoney(2, ".", ",");
        this.element.innerHTML = formatted;
        return this;
    };
    Price.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function Thumbnail(attrs) {
        this.element = document.getElementById("video-thumbnail");
        this.initialize(attrs).buildElement();
        return this;
    }
    Thumbnail.prototype.initialize = function(splashURL) {
        this.url = splashURL;
        return this;
    };
    Thumbnail.prototype.buildElement = function() {
        this.element.src = this.url;
        return this;
    };
    Thumbnail.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function VideoCreator(attrs) {
        this.element = document.getElementById("video-creator");
        this.initialize(attrs).buildElement();
        return this;
    }
    VideoCreator.prototype.initialize = function(creator) {
        this.name = creator || "(temp) Alexia O'brien";
        return this;
    };
    VideoCreator.prototype.buildElement = function() {
        this.element.innerHTML = this.name;
        return this;
    };
    VideoCreator.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function VideoDescription(info) {
        this.element = document.getElementById("video-description");
        this.info = info || "(default) Wow this is an interesting video. Video description test.";
        this.buildElement();
        return this;
    }
    VideoDescription.prototype.buildElement = function() {
        this.element.innerHTML = this.info;
        return this;
    };
    VideoDescription.prototype.getElement = function() {
        return this.element || this.buildElement().element;
    };
    function VideoPrice(attrs) {
        this.element = document.getElementById("price-scroll");
        this.initialize(attrs);
        return this;
    }
    VideoPrice.prototype.initialize = function(attrs) {
        attrs = attrs || {};
        this.dollar = attrs.priceInCents || .21;
        this.dollar = this.dollar / 100;
        this.btc = attrs.priceInBits || 1;
        this.charms = attrs.shardPrice || .02;
        this.buildElement().buildSVGElement();
        return this;
    };
    VideoPrice.prototype.buildElement = function() {
        this.element.innerHTML = "<ul><li>" + this.charms + " charms</li><li>$" + this.dollar + "</li><li>" + this.btc + " btc</li></ul>";
        this.element.style.display = "inline-block";
        return this;
    };
    VideoPrice.prototype.buildSVGElement = function() {
        var mHeight = 61;
        var mWidth = 100;
        var leftX = [ 0, mWidth, mWidth * 2 ];
        this.dollarRect = this.mSnap.rect(leftX[0], 0, mWidth, mHeight);
        this.dollarRect.attr({
            fill: "#555555"
        });
        this.charmRect = this.mSnap.rect(leftX[1], 0, mWidth, mHeight);
        this.charmRect.attr({
            fill: "#999999"
        });
        this.btcRect = this.mSnap.rect(leftX[2], 0, mWidth, mHeight);
        this.btcRect.attr({
            fill: "#BBBBBB"
        });
        this.viewBox = this.mSnap.rect(0, 0, mWidth, mHeight);
        this.sprite.attr({
            mask: this.viewBox
        });
        this.svgElement = this.viewBox.node;
        return this;
    };
    VideoPrice.prototype.getElement = function() {
        return this.svgElement;
    };
    function VideoRating(rating) {
        this.element = document.getElementById("video-rating");
        var r = rating || {
            value: .5,
            info: "Some info"
        };
        this.initialize(r).buildElement();
    }
    VideoRating.prototype.initialize = function(rating) {
        if (rating.value > 1) {
            rating.value = rating.value / 10;
        }
        this.value = rating.value;
        this.info = rating.info;
        return this;
    };
    VideoRating.prototype.buildElement = function() {
        var self = this;
        this.buildStars();
        for (var i = 0; i < 5; i++) {
            this.addStar(true);
        }
        console.log(this.element);
        return this;
    };
    VideoRating.prototype.buildStars = function() {};
    VideoRating.prototype.addStar = function(good) {
        var star = document.createElement("span");
        star.innerHTML = "&#9733";
        star.className = "rating-star";
        star.className = star.className + (good ? " good-star" : " bad-star");
        this.element.appendChild(star);
        return this;
    };
    VideoRating.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function VideoTitle(title) {
        this.element = document.getElementById("video-title");
        this.initialize(title).buildElement();
        return this;
    }
    VideoTitle.prototype.initialize = function(title) {
        this.title = title || "(TEMP) Surfer gets attacked by Shark";
        return this;
    };
    VideoTitle.prototype.buildElement = function() {
        this.element.innerHTML = this.title;
        return this;
    };
    VideoTitle.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function ViewCount(attrs) {
        this.element = document.getElementById("view-count");
        this.initialize(attrs).buildElement();
        return this;
    }
    ViewCount.prototype.initialize = function(attrs) {
        attrs = attrs || {};
        this.viewCount = attrs.viewCount || "(temp) 192,000";
        this.viewersCount = attrs.viewers || null;
        return this;
    };
    ViewCount.prototype.buildElement = function() {
        if (this.viewCount) {
            this.element.innerHTML = this.viewCount + " views";
        } else {
            this.element.innerHTML = this.viewersCount + " viewers";
        }
        return this;
    };
    ViewCount.prototype.getElement = function() {
        return this.element ? this.element : this.buildElement().element;
    };
    function FrameContainer(synchronizedStates) {
        this.playerState = synchronizedStates.playerState;
        this.pairingState = synchronizedStates.pairingState;
        this.accountState = synchronizedStates.accountState;
        this.element = document.body;
        this.landingPage = new LandingPage();
        this.god = {};
        this.eventBus = new EventBus([ "initSplash", "startVideo", "endpointPlay", "endpointPause", "rotateCarousel", "observableScroll" ]);
        this.shyTimeout = null;
        return this;
    }
    FrameContainer.prototype.oninitReady = function() {
        this.playerContainer = new PlayerContainer({
            playerState: this.playerState,
            accountState: this.accountState,
            pairingState: this.pairingState
        });
        this.playerContainer.initialize();
        this.splashModule = new SplashModule({
            playerState: this.playerState,
            accountState: this.accountState,
            pairingState: this.pairingState
        });
        var allPanels = this.splashModule.getPanels();
        allPanels.player = this.playerContainer;
        this.controlBar = new ControlBar();
        this.controlBar.initialize();
        this.panelsCarousel = new PanelsCarousel(allPanels);
        this.landingPage.dissolve();
        this.mapEvents().grantRights();
        this.setupShyify();
        document.onmouseout = function() {
            document.getElementById("control-bar").classList.add("hidden-drawer");
        };
        document.onmousemove = function() {
            if (!document.getElementById("control-bar").classList.contains("hidden-drawer")) {
                clearTimeout(this.shyTimeout);
                this.shyTimeout = setTimeout(function() {
                    document.getElementById("control-bar").classList.add("hidden-drawer");
                    document.body.classList.add("hide-mouse");
                }, 3e3);
            } else {
                document.getElementById("control-bar").classList.remove("hidden-drawer");
                document.body.classList.remove("hide-mouse");
            }
        };
        document.getElementById("control-bar").classList.remove("port-FP-uninitialized");
        document.getElementById("fullpage").classList.remove("port-FP-uninitialized");
        document.getElementById("control-bar").classList.add("opened-drawer");
        $("#fullpage").fullpage({
            menu: "#control-bar",
            lockAnchors: false,
            anchors: [ "playerPage", "videoInfoPage", "pairingPage", "accountPage", "portolPage" ],
            navigation: false,
            navigationPosition: "right",
            navigationTooltips: [ "playerPanel", "videoInfoPanel", "pairingPanel" ],
            showActiveTooltip: true,
            slidesNavigation: true,
            slidesNavPosition: "bottom",
            css3: true,
            scrollingSpeed: 590,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 400,
            scrollBar: false,
            easing: "easeInOutCubic",
            easingcss3: "ease",
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            continuousVertical: false,
            scrollOverflow: false,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            keyboardScrolling: true,
            animateAnchor: true,
            recordHistory: true,
            controlArrows: true,
            verticalCentered: true,
            resize: false,
            paddingTop: "3em",
            paddingBottom: "10px",
            fixedElements: "#shim-gradient, #theme-backdrop",
            responsiveWidth: 0,
            responsiveHeight: 0,
            onLeave: function(index, nextIndex, direction) {},
            afterLoad: function(anchorLink, index) {},
            afterRender: function() {},
            afterResize: function() {},
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
            onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {}
        });
        return this;
    };
    FrameContainer.prototype.setupShyify = function() {
        this.shyTimeout = setTimeout(function() {
            document.getElementById("control-bar").classList.add("hidden-drawer");
        }, 3e3);
    };
    FrameContainer.prototype.grantRights = function() {
        var self = this;
        this.playerContainer.triggerPlayerBuyRequest = function() {
            self.triggerPlayerBuyRequest();
        };
        this.splashModule.triggerPreviewRequest = function() {
            self.triggerPreviewRequest();
        };
        this.splashModule.triggerFavoriteRequest = function() {
            self.triggerFavoriteRequest();
        };
        this.splashModule.triggerBookmarkDeleteRequest = function() {
            self.triggerBookmarkDeleteRequest();
        };
        this.god.triggerHybrid = this.eventBus.trigger.bind(this.eventBus, "hybrid");
        this.god.triggerInitSplash = this.eventBus.trigger.bind(this.eventBus, "initSplash");
        this.god.triggerStartVideo = this.eventBus.trigger.bind(this.eventBus, "startVideo");
        this.god.triggerEndpointPlay = this.eventBus.trigger.bind(this.eventBus, "endpointPlay");
        this.god.triggerEndpointPause = this.eventBus.trigger.bind(this.eventBus, "endpointPause");
        this.controlBar.triggerRotateCarousel = this.eventBus.trigger.bind(this.eventBus, "rotateCarousel");
        this.panelsCarousel.triggerObservableScroll = this.eventBus.trigger.bind(this.eventBus, "observableScroll");
        return this;
    };
    FrameContainer.prototype.mapEvents = function() {
        this.eventBus.subscribe(this.splashModule, [ "initSplash", "startVideo" ]);
        this.eventBus.subscribe(this.playerContainer, [ "startVideo", "endpointPlay", "endpointPause" ]);
        this.eventBus.subscribe(this.controlBar, [ "observableScroll", "startVideo" ]);
        this.eventBus.subscribe(this.panelsCarousel, [ "rotateCarousel", "startVideo" ]);
        this.playerState.stateEventBus.subscribe(this, [ "platformClaimed" ]);
        return this;
    };
    FrameContainer.prototype.onplatformClaimed = function() {
        var newColor = this.playerState.getStateObject().hostPlatform.platformColor;
        this.controlBar.pairingButton.setPlatformColor(newColor);
        return this;
    };
    FrameContainer.prototype.validateElement = function() {
        var minWidth = 400;
        var minHeight = 350;
        var e = this.element;
        e.style.height = e.clientHeight >= minHeight ? e.style.height : minHeight;
        e.style.width = e.clientWidth >= minWidth ? e.style.width : minWidth;
        return this;
    };
    FrameContainer.prototype.onpreviewReady = function(previewResponse) {
        this.splashModule.god.triggerShyify(previewResponse);
        this.playerContainer.god.triggerFocus(previewResponse);
        return this;
    };
    FrameContainer.prototype.onvideoReady = function(videoResponse) {
        this.god.triggerStartVideo(videoResponse);
        return this;
    };
    FrameContainer.prototype.onendpointPlay = function() {
        this.god.triggerEndpointPlay();
        return this;
    };
    FrameContainer.prototype.onendpointPause = function() {
        this.god.triggerEndpointPause();
        return this;
    };
    function LandingPage() {
        this.element = document.getElementById("landing-page");
        this.god = {};
        this.eventBus = new EventBus([]);
        return this;
    }
    LandingPage.prototype.dissolve = function() {
        this.element.style.display = "none";
        return this;
    };
    function Portol(attrs) {
        this.version = "v0";
        this.modules = {};
        this.playerState = new PlayerState();
        this.playerState.initialize();
        this.playerState.updateState({
            apiKey: attrs.apiKey,
            videoKey: attrs.videoKey,
            referrerId: attrs.referrerId
        });
        this.accountState = new AccountState();
        this.accountState.initialize();
        this.pairingState = new PairingState();
        this.frameContainer = new FrameContainer({
            playerState: this.playerState,
            accountState: this.accountState,
            pairingState: this.pairingState
        });
        this.endpointService = new EndpointService(this.version, {
            apiKey: attrs.apiKey,
            videoKey: attrs.videoKey,
            referrerId: attrs.referrerId
        }, {
            playerState: this.playerState,
            accountState: this.accountState,
            pairingState: this.pairingState
        });
        this.god = {};
        this.eventBus = new EventBus([ "initRequest", "initReady", "previewRequest", "previewReady", "startPolling", "videoReady", "paymentChange", "login", "endpointPlay", "endpointPause", "playerBuyRequest", "favoriteRequest", "bookmarkDeleteRequest" ]);
        this.mapEvents().grantRights();
        this.endpointService.doInit();
        return this;
    }
    Portol.prototype.mapEvents = function() {
        this.eventBus.subscribe(this.frameContainer, [ "initReady", "previewReady", "videoReady", "paymentChange", "endpointPlay", "endpointPause" ]);
        this.eventBus.subscribe(this.endpointService, [ "previewRequest", "playerBuyRequest", "favoriteRequest", "bookmarkDeleteRequest" ]);
        return this;
    };
    Portol.prototype.grantRights = function() {
        this.frameContainer.triggerPreviewRequest = this.eventBus.trigger.bind(this.eventBus, "previewRequest");
        this.frameContainer.triggerPlayerBuyRequest = this.eventBus.trigger.bind(this.eventBus, "playerBuyRequest");
        this.frameContainer.triggerFavoriteRequest = this.eventBus.trigger.bind(this.eventBus, "favoriteRequest");
        this.frameContainer.triggerLogin = this.eventBus.trigger.bind(this.eventBus, "login");
        this.frameContainer.triggerBookmarkDeleteRequest = this.eventBus.trigger.bind(this.eventBus, "bookmarkDeleteRequest");
        this.endpointService.triggerInitReady = this.eventBus.trigger.bind(this.eventBus, "initReady");
        this.endpointService.triggerPreviewReady = this.eventBus.trigger.bind(this.eventBus, "previewReady");
        this.endpointService.triggerVideoReady = this.eventBus.trigger.bind(this.eventBus, "videoReady");
        this.endpointService.triggerPaymentChange = this.eventBus.trigger.bind(this.eventBus, "paymentChange");
        this.endpointService.triggerEndpointPlay = this.eventBus.trigger.bind(this.eventBus, "endpointPlay");
        this.endpointService.triggerEndpointPause = this.eventBus.trigger.bind(this.eventBus, "endpointPause");
        return this;
    };
    var api = {
        registerPlayer: function(attrs) {
            return new Portol(attrs);
        },
        logDocumentation: function() {
            console.log("documentation");
        }
    };
    return api;
}();