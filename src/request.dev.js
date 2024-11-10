import { $platform, URL, _, Storage, fetch, notification, log, logError, wait, done, getScript, runScript } from "./utils/utils.mjs";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
// 构造回复数据
let $response = undefined;
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method,
	HOST = url.hostname,
	PATH = url.pathname;
log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}`, "");
// 解析格式
const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
log(`⚠ FORMAT: ${FORMAT}`, "");
!(async () => {
	/**
	 * @type {{Settings: import('./types').Settings}}
	 */
	const { Settings, Caches, Configs } = setENV("iRingo", "News", database);
	// 创建空数据
	let body = {};
	// 方法判断
	switch (METHOD) {
		case "POST":
		case "PUT":
		case "PATCH":
		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "DELETE":
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					//body = M3U8.parse($request.body);
					//log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$request.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					//body = XML.parse($request.body);
					//log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$request.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					//body = VTT.parse($request.body);
					//log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$request.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($request.body ?? "{}");
					log(`🚧 body: ${JSON.stringify(body)}`, "");
					// 主机判断
					switch (HOST) {
						case "news-edge.apple.com":
						case "news-todayconfig-edge.apple.com":
							// 路径判断
							switch (PATH) {
								case "/v1/configs":
									if (Settings.CountryCode !== "AUTO") body.storefrontId = Configs.Storefront[Settings.CountryCode];
									if (body?.deviceInfo?.preferredLanguages) {
										body.deviceInfo.preferredLanguages.unshift("zh-SG", "zh-Hans-US", "zh-Hant-US");
										body.deviceInfo.preferredLanguages.push("en");
									}
									if (Settings.CountryCode !== "AUTO") body.deviceInfo.countryCode = Settings?.CountryCode ?? "US";
									break;
							}
							break;
						case "news-events.apple.com":
						case "news-sports-events.apple.com":
							switch (PATH) {
								case "/analyticseventsv2/async":
									if (body?.data?.session?.mobileData) {
										body.data.session.mobileData.countryCode = "310";
										body.data.session.mobileData.carrier = "Google Fi";
										body.data.session.mobileData.networkCode = "260";
									}
									break;
							}
							break;
						case "news-client-search.apple.com":
							switch (PATH) {
								case "/v1/search":
									break;
							}
							break;
					}
					$request.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "applecation/octet-stream":
					break;
			}
		//break; // 不中断，继续处理URL
		case "GET":
		case "HEAD":
		case "OPTIONS":
		default:
			// 主机判断
			switch (HOST) {
				case "news-edge.apple.com":
				case "news-todayconfig-edge.apple.com":
					// 路径判断
					switch (PATH) {
						case "/v1/configs":
							break;
					}
					break;
				case "news-events.apple.com":
				case "news-sports-events.apple.com":
					switch (PATH) {
						case "/analyticseventsv2/async":
							break;
					}
					break;
				case "news-client-search.apple.com":
					switch (PATH) {
						case "/v1/search":
							const ParsecParameters = url.searchParams.get("parsecParameters"),
								StorefrontID = url.searchParams.get("storefrontID"),
								NewsPlusUser = url.searchParams.get("newsPlusUser");
							log(`🚧 调试信息, ParsecParameters: ${ParsecParameters}, StorefrontID: ${StorefrontID}, NewsPlusUser: ${NewsPlusUser}`, "");
							if (ParsecParameters) {
								let parsecParameters = decodeURIComponent(ParsecParameters);
								log("🚧 调试信息", `decodeURIComponent(ParsecParameters): ${parsecParameters}`, "");
								parsecParameters = JSON.parse(parsecParameters);
								//log("🚧 调试信息", `JSON.parse(parsecParameters): ${parsecParameters}`, "");
								if (parsecParameters.storeFront) {
									if (Settings.CountryCode !== "AUTO") parsecParameters.storeFront = parsecParameters.storeFront.replace(/[\d]{6}/, Configs.Storefront[Settings.CountryCode]);
								}
								parsecParameters = JSON.stringify(parsecParameters);
								//log("🚧 调试信息", `JSON.stringify(parsecParameters): ${parsecParameters}`, "");
								parsecParameters = encodeURIComponent(parsecParameters);
								//log("🚧 调试信息", `encodeURIComponent(parsecParameters): ${parsecParameters}`, "");
								url.searchParams.set("parsecParameters", parsecParameters);
							}
							if (StorefrontID) {
								if (Settings.CountryCode !== "AUTO") url.searchParams.set("storefrontID", Configs.Storefront[Settings.CountryCode]);
							}
							if (NewsPlusUser) url.searchParams.set("newsPlusUser", Settings.NewsPlusUser || NewsPlusUser);
							break;
					}
					break;
			}
			break;
		case "CONNECT":
		case "TRACE":
			break;
	}
	$request.url = url.toString();
	log("🚧 调试信息", `$request.url: ${$request.url}`, "");
})()
	.catch(e => logError(e))
	.finally(() => {
		switch ($response) {
			default: // 有构造回复数据，返回构造的回复数据
				//log(`🚧 finally`, `echo $response: ${JSON.stringify($response, null, 2)}`, "");
				if ($response.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
				switch ($platform) {
					default:
						done({ response: $response });
						break;
					case "Quantumult X":
						if (!$response.status) $response.status = "HTTP/1.1 200 OK";
						delete $response.headers?.["Content-Length"];
						delete $response.headers?.["content-length"];
						delete $response.headers?.["Transfer-Encoding"];
						done($response);
						break;
				}
				break;
			case undefined: // 无构造回复数据，发送修改的请求数据
				//log(`🚧 finally`, `$request: ${JSON.stringify($request, null, 2)}`, "");
				done($request);
				break;
		}
	});
