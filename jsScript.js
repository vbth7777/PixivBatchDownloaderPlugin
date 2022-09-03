var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] ||
                                      ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var Token = /** @class */ (function () {
    function Token() {
        this.tokenStore = "xzToken";
        this.timeStore = "xzTokenTime";
        this.updateURL = "https://www.pixiv.net/artworks/62751951";
        this.interval = 300000; // 两次更新之间的最小时间间隔。目前设置为 5 分钟
        this.token = this.getToken();
        this.updateToken();
        this.bindEvents();
    }
    Token.prototype.bindEvents = function () {
        var _this = this;
    };
    Token.prototype.getToken = function () {
        var token = localStorage.getItem(this.tokenStore);
        return token ? token : "";
    };
    Token.prototype.updateToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nowTime, lastTimeStr;
            var _this = this;
            return __generator(this, function (_a) {
                nowTime = new Date().getTime();
                lastTimeStr = localStorage.getItem(this.timeStore);
                if (
                    this.token &&
                    lastTimeStr &&
                    nowTime - Number.parseInt(lastTimeStr) < this.interval
                ) {
                    return [2 /*return*/];
                }
                // 从网页源码里获取用户 token 并储存
                return [
                    2 /*return*/,
                    fetch(this.updateURL)
                        .then(function (response) {
                            return response.text();
                        })
                        .then(function (data) {
                            var result = data.match(/token":"(\w+)"/);
                            // 不论用户是否登录，都有 token，所以不能根据 token 来判断用户是否登录
                            // 如果存在下面的字符串，则说明用户未登录：
                            // "userData":null
                            if (result) {
                                _this.token = result[1];
                                localStorage.setItem(
                                    _this.tokenStore,
                                    _this.token
                                );
                                localStorage.setItem(
                                    _this.timeStore,
                                    new Date().getTime().toString()
                                );
                            } else {
                                console.error(
                                    "UpdateToken failed: no token found!"
                                );
                            }
                        }),
                ];
            });
        });
    };
    Token.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.token = "";
                localStorage.removeItem(this.tokenStore);
                localStorage.removeItem(this.timeStore);
                return [2 /*return*/, this.updateToken()];
            });
        });
    };
    return Token;
})();
const token = new Token();

let isAppend = false;
isOutBox = false;
isGhimBox = false;
hasPreviewBox = false;
mouseMoveEvent = null;
currentPreviewPosition = 0;
previewIdImg = null;
previewImgElement = null;
isNewPreviewBox = true;
isUserBoxShow = false;
previousImgBeforeIntoUserBox = null;
currentLocation = window.location.href;
document.onmousemove = function (e) {
    const paths = e.path;
    let isInPreviewBox = false;
    for (const el of paths) {
        if (el.id == "previewWorkWrap") {
            isInPreviewBox = true;
            break;
        }
    }
    if (!isInPreviewBox) {
        mouseMoveEvent = e;
    }
    const img = document.querySelector("#previewWorkWrap > img");
    if (img ? img.src != document.location : false) {
        if (e.target?.tagName == "IMG") {
            previewImgElement = e.target;
            previewIdImg = getIdImgFromImgNode(previewImgElement);
        }
        hasPreviewBox = true;
        img.onmousemove = (e) => {
            isOutBox = false;
        };
    } else {
        hasPreviewBox = false;
    }
    document.querySelector("#downloadBtnOnThumb").onmousemove = (e) => {
        isOutBox = false;
    };
    document.querySelector("#zoomBtnOnThumb").onmousemove = (e) => {
        isOutBox = false;
    };
    const authorBox = document.querySelector("body > div:last-child > div");
    if (authorBox) {
        authorBox.onmouseover = (e) => {
            isOutBox = false;
            isAppend = true;
        };
    }
    if (authorBox && !isGhimBox && isAppend) {
        isGhimBox = true;
        authorBox.className = "ghim";
        authorBox.onmouseout = (e) => {
            isOutBox = true;
            isAppend = false;
        };
        const btn = authorBox.querySelector("button");
        btn.style.backgroundColor = "cyan";
        btn.style.color = "black";
        btn.onclick = (e) => {
            let userId = authorBox.querySelector("a")?.href;
            if (!userId) {
                return;
            }
            userId = userId.match(/\d+$/)[0];
            const btn = authorBox.querySelector("button");
            if (btn.innerText.toLowerCase() == "follow") {
                addFollowing(userId);
                btn.innerText = "Following";
            } else {
                removeFollowing(userId);
                btn.innerText = "Follow";
            }
        };
        document.body.appendChild(authorBox);
    } else if (isOutBox && !hasPreviewBox) {
        isOutBox = false;
        document.body.querySelector("body > div:last-child").remove();
        isGhimBox = false;
    }
};
document.onkeydown = function (e) {
    if (currentLocation != window.location.href) {
        currentLocation = window.location.href;
        previewIdImg = null;
        previewImgElement = null;
    }
    if (e.key.toLowerCase() == "e" || e.key.toLowerCase() == "d") {
        let isBookmark = false;
        if (mouseMoveEvent) {
            const paths = mouseMoveEvent.path;
            let illus = null;
            for (let i = 0; i < paths.length; ++i) {
                if (paths[i].tagName == "UL") {
                    illus = paths[i - 1];
                    break;
                }
            }
            if (illus) {
                const btn = illus.querySelector("div [type=illust] button");
                if (btn) {
                    btn.click();
                    isBookmark = true;
                }
                return;
            }
        }
        const imgs = document.querySelectorAll(
            "div[type=illust] > div img[src]"
        );
        checkAndSetPreviewIdImg(imgs);
        const length = imgs.length;
        for (let i = 0; i < length; ++i) {
            if (!imgs[i]?.src) continue;
            if (imgs[i].src.indexOf(previewIdImg) != -1 && i < length) {
                try {
                    isBookmark = true;
                    let elementBtn =
                        imgs[
                            i
                        ].parentElement.parentElement.nextElementSibling.querySelector(
                            "button"
                        );
                    elementBtn.click();
                } catch {
                    isBookmark = false;
                }
                break;
            }
        }
        if (!isBookmark) {
            addBookmark(previewIdImg, "illusts", [], false);
        }
    } else if (e.key == "z") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (previewIdImg === null) {
            isNewPreviewBox = true;
        } else {
            isNewPreviewBox =
                getIdImgFromImgNode(previewImgElement) !=
                getIdImgFromImgNode(
                    document.querySelector("#previewWorkWrap img")
                );
        }
        if (isNewPreviewBox) {
            const imgs = document.querySelectorAll(
                "div[type=illust] > div img[src]"
            );
            checkAndSetPreviewIdImg(imgs);
            const length = imgs.length;
            for (let i = 0; i < length; ++i) {
                if (!imgs[i]?.src) continue;
                if (imgs[i].src.indexOf(previewIdImg) != -1 && i < length) {
                    previewImgElement = imgs[i];
                    simulateMouseWheel(previewImgElement, true);
                    previewIdImg = getIdImgFromImgNode(imgs[i]);
                    break;
                }
            }
        } else {
            simulateMouseWheel(previewImgElement, true);
        }
    } else if (e.key == "x") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        isNewPreviewBox =
            getIdImgFromImgNode(previewImgElement) !=
            getIdImgFromImgNode(document.querySelector("#previewWorkWrap img"));
        if (previewIdImg === null) {
            isNewPreviewBox = true;
        }
        if (isNewPreviewBox) {
            const imgs = document.querySelectorAll(
                "div[type=illust] > div img[src]"
            );
            checkAndSetPreviewIdImg(imgs);
            const length = imgs.length;
            for (let i = 0; i < length; ++i) {
                if (!imgs[i]?.src) continue;
                if (imgs[i].src.indexOf(previewIdImg) != -1 && i < length) {
                    previewImgElement = imgs[i];
                    simulateMouseWheel(previewImgElement, false);
                    previewIdImg = getIdImgFromImgNode(imgs[i]);
                    break;
                }
            }
        } else {
            simulateMouseWheel(previewImgElement, false);
        }
    } else if (e.key == "s") {
        focusToFirstImgInUserBox();
    } else if (e.key == "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const imgs = document.querySelectorAll(
            "div[type=illust] > div img[src]"
        );
        checkAndSetPreviewIdImg(imgs);
        const length = imgs.length;
        for (let i = 0; i < length; ++i) {
            if (!imgs[i]?.src) continue;
            if (previewImgElement === null || previewIdImg === null) {
                previewImgElement = imgs[i];
                previewIdImg = getIdImgFromImgNode(imgs[i]);
            }
            // if (imgs[i].src.indexOf(previewIdImg) != -1 && i < length) {
            if (imgs[i] == previewImgElement && imgs[i + 1]) {
                imgs[i + 1]?.scrollIntoViewIfNeeded();
                simulateMouseEnter(imgs[i + 1]);
                previewImgElement = imgs[i + 1];
                previewIdImg = getIdImgFromImgNode(imgs[i + 1]);
                break;
            }
        }
    } else if (e.key == "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const imgs = document.querySelectorAll(
            "div[type=illust] > div img[src]"
        );
        checkAndSetPreviewIdImg(imgs);
        const length = imgs.length;
        for (let i = 0; i < length; ++i) {
            if (!imgs[i]?.src) continue;
            if (previewImgElement === null || previewIdImg === null) {
                previewImgElement = imgs[i];
                previewIdImg = getIdImgFromImgNode(imgs[i]);
            }
            // if (imgs[i].src.indexOf(previewIdImg) != -1 && i >= 0) {
            if (imgs[i] == previewImgElement && imgs[i - 1]) {
                if (previousImgBeforeIntoUserBox && length - i == 3) {
                    break;
                }
                imgs[i - 1]?.scrollIntoViewIfNeeded();
                simulateMouseEnter(imgs[i - 1]);
                previewImgElement = imgs[i - 1];
                previewIdImg = getIdImgFromImgNode(imgs[i - 1]);
                break;
            }
        }
    } else if (e.key == "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const imgs = document.querySelectorAll(
            "div[type=illust] > div img[src]"
        );
        checkAndSetPreviewIdImg(imgs);
        const length = imgs.length;
        for (let i = 0; i < length; ++i) {
            if (!imgs[i]?.src) continue;
            if (previewImgElement === null || previewIdImg === null) {
                previewImgElement = imgs[i];
                previewIdImg = getIdImgFromImgNode(imgs[i]);
            }
            // if (imgs[i].src.indexOf(previewIdImg) != -1 && i >= 0) {
            if (
                imgs[i] == previewImgElement &&
                imgs[i - 5] &&
                !previousImgBeforeIntoUserBox
            ) {
                imgs[i - 5]?.scrollIntoViewIfNeeded();
                simulateMouseEnter(imgs[i - 5]);
                previewImgElement = imgs[i - 5];
                previewIdImg = getIdImgFromImgNode(imgs[i - 5]);
                break;
            }
        }
    } else if (e.key == "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const imgs = document.querySelectorAll(
            "div[type=illust] > div img[src]"
        );
        const length = imgs.length;
        checkAndSetPreviewIdImg(imgs);
        for (let i = 0; i < length; ++i) {
            if (!imgs[i]?.src) continue;
            if (previewImgElement === null || previewIdImg === null) {
                previewImgElement = imgs[i];
                previewIdImg = getIdImgFromImgNode(imgs[i]);
            }
            // if (imgs[i].src.indexOf(previewIdImg) != -1 && i < length) {
            if (imgs[i] == previewImgElement && imgs[i + 5]) {
                imgs[i + 5]?.scrollIntoViewIfNeeded();
                simulateMouseEnter(imgs[i + 5]);
                previewImgElement = imgs[i + 5];
                previewIdImg = getIdImgFromImgNode(imgs[i + 5]);
                break;
            }
        }
    }
};
function checkAndSetPreviewIdImg(imgs) {
    let tempId = null;
    const idImg = document
        .querySelector("#previewWorkWrap")
        ?.querySelector("img:last-child");
    if (idImg) {
        tempId = getIdImgFromImgNode(idImg);
    }
    if (tempId) {
        previewIdImg = tempId;
        return;
    }
    if (!previewIdImg) {
        previewImgElement = imgs[0];
        previewIdImg = getIdImgFromImgNode(imgs[0]);
    }
}
function getIdImgFromImgNode(node) {
    const src = node?.getAttribute("src");
    if (src && src?.match(/https?:\/\/i\.pximg/)) {
        const id = src.match(/\/\d+/g);
        if (id) {
            return id[id.length - 1].replace(/^\//, "")?.trim();
        } else {
            return null;
        }
    }
}
function simulateMouseOver(node) {
    var event = new MouseEvent("mouseover", {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true,
    });
    var myTarget = node;
    myTarget?.dispatchEvent(event);
}
function simulateMouseOut(node) {
    var event = new MouseEvent("mouseout", {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true,
    });
    var myTarget = node;
    myTarget?.dispatchEvent(event);
}
function simulateMouseEnter(node) {
    var event = new MouseEvent("mouseenter", {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true,
    });
    var myTarget = node;
    myTarget?.dispatchEvent(event);
}
function simulateMouseWheel(node, isUp) {
    const wheelValue = isUp ? -90 : 90;
    var event = new WheelEvent("mousewheel", {
        view: window,
        bubbles: true,
        cancelable: true,
        composed: true,
        deltaY: wheelValue,
    });
    var myTarget = node;
    myTarget?.dispatchEvent(event);
}

async function addBookmark(id, type, tags, hide) {
    var restrict = hide ? 1 : 0;
    var body = {};
    if (type === "illusts") {
        body = {
            comment: "",
            illust_id: id,
            restrict: restrict,
            tags: tags,
        };
    } else {
        body = {
            comment: "",
            novel_id: id,
            restrict: restrict,
            tags: tags,
        };
    }
    const request = fetch(
        "https://www.pixiv.net/ajax/".concat(type, "/bookmarks/add"),
        {
            method: "POST",
            credentials: "same-origin",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "x-csrf-token": token.token,
            },
            body: JSON.stringify(body),
        }
    );

    let status = 0;
    await request.then((res) => {
        status = res.status;
    });
    if (status === 400) {
        await token.reset();
        return addBookmark(id, type, tags, _restrict, token.token);
    }
}
async function removeBookmark(bookmarkId) {
    const formData = new URLSearchParams();
    formData.append("mode", "delete_illust_bookmark");
    formData.append("bookmark_id", bookmarkId);
    const request = fetch("https://www.pixiv.net/rpc/index.php", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            "x-csrf-token": token.token,
        },
        body: formData,
    });

    let status = 0;
    await request.then((res) => {
        status = res.status;
    });
    if (status === 400) {
        await token.reset();
        return removeBookmark(bookmarkId);
    }
}
async function addFollowing(userId) {
    const formData = new URLSearchParams();
    formData.append("mode", "add");
    formData.append("type", "user");
    formData.append("user_id", userId);
    formData.append("tag", "");
    formData.append("restrict", "0");
    formData.append("format", "json");
    const request = fetch("https://www.pixiv.net/bookmark_add.php", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            "x-csrf-token": token.token,
        },
        body: formData,
    });

    let status = 0;
    await request.then((res) => {
        status = res.status;
    });
    if (status === 400) {
        await token.reset();
        return addFollowing(userId);
    }
}
async function removeFollowing(userId) {
    const formData = new URLSearchParams();
    formData.append("mode", "del");
    formData.append("type", "bookuser");
    formData.append("id", userId);
    const request = fetch("https://www.pixiv.net/rpc_group_setting.php", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            "x-csrf-token": token.token,
        },
        body: formData,
    });

    let status = 0;
    await request.then((res) => {
        status = res.status;
    });
    if (status === 400) {
        await token.reset();
        return removeFollowing(userId);
    }
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function focusToFirstImgInUserBox() {
    const bodyDivLast = "body > div:last-child";
    if (
        document.querySelectorAll(bodyDivLast + " img[src][class]").length > 0
    ) {
        previewIdImg = getIdImgFromImgNode(previousImgBeforeIntoUserBox);
        previewImgElement = previousImgBeforeIntoUserBox;
        previousImgBeforeIntoUserBox = null;
        simulateMouseOut(document.querySelector(bodyDivLast + " > div"));
        return;
    }
    let focusImg = previewIdImg;
    Array.from(document.querySelectorAll("img[src][class]")).forEach((img) => {
        if (img?.src?.includes(focusImg)) {
            focusImg = img;
            previewImgElement = img;
        }
    });
    // if (focusImg === previewIdImg) {
    //     return;
    // }
    previousImgBeforeIntoUserBox = focusImg;
    while (focusImg.getAttribute("type") != "illust") {
        if (focusImg.parentElement === null) break;
        focusImg = focusImg.parentElement;
    }
    simulateMouseOver(
        focusImg.nextElementSibling.nextElementSibling.firstChild
    );
    while (
        document.querySelectorAll(bodyDivLast + " img[src][class]")?.length == 0
    ) {
        await sleep(500);
        const div = document
            .querySelector(bodyDivLast)
            ?.querySelector("div[open] > div");
        if (div) {
            div.scrollTop = div.scrollHeight;
        }
    }
    const imgs = document.querySelectorAll(bodyDivLast + " img[src][class]");
    simulateMouseEnter(imgs[0]);
    previewImgElement = imgs[0];
    previewIdImg = getIdImgFromImgNode(imgs[0]);
}

// function (value){
//     previewIdImg = value;
//     isNewPreviewBox = true;
// }
// }
// }
// }
