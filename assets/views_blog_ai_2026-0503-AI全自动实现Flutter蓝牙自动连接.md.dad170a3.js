import{_ as a,o as n,c as l,U as e}from"./chunks/framework.e625a6bf.js";const y=JSON.parse('{"title":"AI全自动实现Flutter蓝牙自动连接","description":"","frontmatter":{"title":"AI全自动实现Flutter蓝牙自动连接","date":"2026/05/03 18:02:34","summary":"一篇由AI代码实现，连文章也是AI写的文章。除了设计思想是我的，其它的都是AI实现的。AI时代，更注重的是什么，值钱的是什么，可能是问题的解决能力吧。一个好的方案设计吧","config":{"show":true,"top":false,"dir":true,"dirTag":["h3","h4","h5"],"tag":["info","ai"],"valine":true,"valineId":null},"password":false,"outline":[3,5]},"headers":[],"relativePath":"views/blog/ai/2026-0503-AI全自动实现Flutter蓝牙自动连接.md","filePath":"views/blog/ai/2026-0503-AI全自动实现Flutter蓝牙自动连接.md"}'),p={name:"views/blog/ai/2026-0503-AI全自动实现Flutter蓝牙自动连接.md"};function o(t,s,c,r,i,b){return n(),l("div",null,[...s[0]||(s[0]=[e(`<h6 id="原文-掘金" tabindex="-1">原文 <a href="https://juejin.cn/post/7634768133992349696" target="_blank" rel="noreferrer">掘金</a> <a class="header-anchor" href="#原文-掘金" aria-label="Permalink to &quot;原文 [掘金](https://juejin.cn/post/7634768133992349696)&quot;">​</a></h6><h2 id="ai辅助设计flutter蓝牙自动连接系统" tabindex="-1">AI辅助设计Flutter蓝牙自动连接系统 <a class="header-anchor" href="#ai辅助设计flutter蓝牙自动连接系统" aria-label="Permalink to &quot;AI辅助设计Flutter蓝牙自动连接系统&quot;">​</a></h2><h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><blockquote><p>一篇由AI代码实现，连文章也是AI写的文章。除了设计思想是我的，其它的都是AI实现的。AI时代，更注重的是什么，值钱的是什么，可能是问题的解决能力吧。一个好的方案设计吧。</p></blockquote><h3 id="一、项目背景与需求分析" tabindex="-1">一、项目背景与需求分析 <a class="header-anchor" href="#一、项目背景与需求分析" aria-label="Permalink to &quot;一、项目背景与需求分析&quot;">​</a></h3><h4 id="_1-1-业务场景描述" tabindex="-1">1.1 业务场景描述 <a class="header-anchor" href="#_1-1-业务场景描述" aria-label="Permalink to &quot;1.1 业务场景描述&quot;">​</a></h4><p>在现代工业物联网系统中，蓝牙连接已经成为一项不可或缺的基础功能。我们的工业物联网项目需要实现工业设备与外部蓝牙设备（如蓝牙音箱、打印机、传感器等）的自动连接功能。</p><p>与传统手机App不同，工业物联网环境对蓝牙连接有着特殊而严苛的要求：</p><p><strong>1. 高可靠性要求</strong> 工业系统不能容忍频繁的连接失败。一次看似简单的蓝牙断连，可能导致重要的语音提示无法播放，影响整个物流调度流程。因此，我们需要设计一套完善的容错机制，确保系统在各种异常情况下都能恢复连接。</p><p><strong>2. 低延迟特性</strong> 连接过程必须尽可能快速。我们不能允许用户等待数十秒甚至数分钟才能完成基本的蓝牙配对。AI在设计时充分考虑了这一点，通过预检查、缓存机制等方式缩短连接时间。</p><p><strong>3. 多版本兼容</strong> Android系统的碎片化是所有移动开发者面临的难题。不同版本的Android系统对蓝牙权限的处理方式截然不同，从Android 6.0到Android 14，每个版本都有其独特的权限模型。我们的系统必须能够优雅地适配所有这些版本。</p><h4 id="_1-2-技术选型分析" tabindex="-1">1.2 技术选型分析 <a class="header-anchor" href="#_1-2-技术选型分析" aria-label="Permalink to &quot;1.2 技术选型分析&quot;">​</a></h4><p>在项目初期，AI对现有的Flutter蓝牙生态进行了全面的调研和分析，最终选择了以下技术栈：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">dependencies:</span></span>
<span class="line"><span style="color:#babed8;">  flutter_bluetooth_serial: ^0.4.0    # 蓝牙串口通信</span></span>
<span class="line"><span style="color:#babed8;">  permission_handler: ^11.0.0        # 权限管理</span></span></code></pre></div><p><strong>flutter_bluetooth_serial</strong> 是一个成熟稳定的Flutter蓝牙插件，它提供了丰富的蓝牙功能，包括：</p><ul><li>经典蓝牙（SPP）和低功耗蓝牙（BLE）支持</li><li>设备发现和配对管理</li><li>串口通信能力</li><li>完善的API设计</li></ul><p><strong>permission_handler</strong> 是Flutter生态中最流行的权限管理库，它：</p><ul><li>统一了Android和iOS的权限处理逻辑</li><li>提供了优雅的权限请求API</li><li>支持权限状态检查和永久拒绝处理</li></ul><h4 id="_1-3-核心设计理念" tabindex="-1">1.3 核心设计理念 <a class="header-anchor" href="#_1-3-核心设计理念" aria-label="Permalink to &quot;1.3 核心设计理念&quot;">​</a></h4><p>AI在设计这套蓝牙自动连接系统时，遵循了以下核心原则：</p><p><strong>渐进式复杂度</strong>：从最简单的场景开始，逐步增加功能复杂性。初始版本只处理基本的连接，随后逐步添加权限管理、自动重连、多设备支持等功能。</p><p><strong>防御性编程</strong>：任何外部调用都可能失败，因此我们必须对每一步操作都进行错误处理和状态检查。</p><p><strong>用户体验优先</strong>：即使出现异常，也要给用户提供清晰的反馈，而不是让用户面对一个“黑屏”或“无响应”的系统。</p><hr><h3 id="二、权限管理系统深度解析" tabindex="-1">二、权限管理系统深度解析 <a class="header-anchor" href="#二、权限管理系统深度解析" aria-label="Permalink to &quot;二、权限管理系统深度解析&quot;">​</a></h3><h4 id="_2-1-android权限演进历史" tabindex="-1">2.1 Android权限演进历史 <a class="header-anchor" href="#_2-1-android权限演进历史" aria-label="Permalink to &quot;2.1 Android权限演进历史&quot;">​</a></h4><p>要设计一个真正兼容所有Android版本的蓝牙系统，我们必须深入理解Android权限模型的演进历史。</p><p><strong>Android 6.0（API 23）- 运行时权限时代</strong> 从Android 6.0开始，Google引入了运行时权限模型。蓝牙扫描不再是无条件的，而是需要用户显式授权位置权限。这是一个看似奇怪但合理的设计——因为蓝牙扫描可以被用来定位用户，所以Google将蓝牙扫描与位置权限绑定。</p><p><strong>Android 10（API 29）- 背景位置限制</strong> Android 10进一步收紧了位置权限的应用场景，使得在后台扫描蓝牙变得更加困难。</p><p><strong>Android 12（API 31）- 全新蓝牙权限API</strong> 这是最重要的变革。Android 12引入了三个全新的蓝牙权限：</p><ul><li><code>BLUETOOTH_SCAN</code> - 蓝牙扫描权限</li><li><code>BLUETOOTH_CONNECT</code> - 蓝牙连接权限</li><li><code>BLUETOOTH_ADVERTISE</code> - 蓝牙广播权限</li></ul><p>这些新权限取代了之前的位置权限要求，使得权限管理更加清晰和直观。</p><p><strong>Android 13（API 33）- 进一步优化</strong> Android 13对蓝牙权限进行了微调，使得开发者的体验更加顺畅。</p><h4 id="_2-2-权限检查与请求流程" tabindex="-1">2.2 权限检查与请求流程 <a class="header-anchor" href="#_2-2-权限检查与请求流程" aria-label="Permalink to &quot;2.2 权限检查与请求流程&quot;">​</a></h4><p>下面是AI设计的完整权限处理流程：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Future&lt;int&gt; _checkBlue() async {</span></span>
<span class="line"><span style="color:#babed8;">  Completer&lt;int&gt; _compCheckBlue = Completer();</span></span>
<span class="line"><span style="color:#babed8;">  print(&#39;目标设备列表: $defaultDriverName&#39;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  try {</span></span>
<span class="line"><span style="color:#babed8;">    // ============================================</span></span>
<span class="line"><span style="color:#babed8;">    // 第一阶段：位置权限处理（Android 12以下必须）</span></span>
<span class="line"><span style="color:#babed8;">    // ============================================</span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;开始检查蓝牙权限&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 检查当前位置权限状态</span></span>
<span class="line"><span style="color:#babed8;">    PermissionStatus locationStatus = await Permission.location.status;</span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;位置权限状态: $locationStatus&#39;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 如果未授予位置权限，需要请求</span></span>
<span class="line"><span style="color:#babed8;">    if (!locationStatus.isGranted) {</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;位置权限未授予,请求权限&#39;);</span></span>
<span class="line"><span style="color:#babed8;">      </span></span>
<span class="line"><span style="color:#babed8;">      // 发起权限请求</span></span>
<span class="line"><span style="color:#babed8;">      final locationResult = await Permission.location.request();</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;请求位置权限结果: $locationResult&#39;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">      // 检查请求结果</span></span>
<span class="line"><span style="color:#babed8;">      if (!locationResult.isGranted) {</span></span>
<span class="line"><span style="color:#babed8;">        print(&#39;权限不足,请授予&quot;附近设备&quot;权限以使用蓝牙功能&#39;);</span></span>
<span class="line"><span style="color:#babed8;">        _compCheckBlue.complete(BluetoothStatus[&#39;PERMISSION_DENIED&#39;]);</span></span>
<span class="line"><span style="color:#babed8;">        return _compCheckBlue.future;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // ============================================</span></span>
<span class="line"><span style="color:#babed8;">    // 第二阶段：蓝牙扫描权限（Android 12+）</span></span>
<span class="line"><span style="color:#babed8;">    // ============================================</span></span>
<span class="line"><span style="color:#babed8;">    // 检查是否已授予蓝牙扫描权限</span></span>
<span class="line"><span style="color:#babed8;">    if (await Permission.bluetoothScan.isGranted == false) {</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;蓝牙扫描权限未授予,请求权限&#39;);</span></span>
<span class="line"><span style="color:#babed8;">      </span></span>
<span class="line"><span style="color:#babed8;">      // 请求蓝牙扫描权限</span></span>
<span class="line"><span style="color:#babed8;">      final bluetoothScanResult = await Permission.bluetoothScan.request();</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;请求蓝牙扫描权限结果: $bluetoothScanResult&#39;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">      // 检查请求结果</span></span>
<span class="line"><span style="color:#babed8;">      if (!bluetoothScanResult.isGranted) {</span></span>
<span class="line"><span style="color:#babed8;">        print(&#39;权限不足,请授予&quot;附近设备&quot;权限以使用蓝牙功能&#39;);</span></span>
<span class="line"><span style="color:#babed8;">        _compCheckBlue.complete(BluetoothStatus[&#39;PERMISSION_DENIED&#39;]);</span></span>
<span class="line"><span style="color:#babed8;">        return _compCheckBlue.future;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // ============================================</span></span>
<span class="line"><span style="color:#babed8;">    // 第三阶段：蓝牙连接权限（Android 12+）</span></span>
<span class="line"><span style="color:#babed8;">    // ============================================</span></span>
<span class="line"><span style="color:#babed8;">    // 这个权限特别重要：必须在requestEnable()之前授予</span></span>
<span class="line"><span style="color:#babed8;">    // 否则会导致蓝牙无法正常开启</span></span>
<span class="line"><span style="color:#babed8;">    if (await Permission.bluetoothConnect.isGranted == false) {</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;需要蓝牙连接权限,正在请求...&#39;);</span></span>
<span class="line"><span style="color:#babed8;">      </span></span>
<span class="line"><span style="color:#babed8;">      final bluetoothConnectResult = await Permission.bluetoothConnect.request();</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;请求蓝牙连接权限结果: $bluetoothConnectResult&#39;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">      if (!bluetoothConnectResult.isGranted) {</span></span>
<span class="line"><span style="color:#babed8;">        print(&#39;权限不足,请授予&quot;附近设备&quot;权限以使用蓝牙功能&#39;);</span></span>
<span class="line"><span style="color:#babed8;">        _compCheckBlue.complete(BluetoothStatus[&#39;PERMISSION_DENIED&#39;]);</span></span>
<span class="line"><span style="color:#babed8;">        return _compCheckBlue.future;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;权限检查通过&#39;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // ============================================</span></span>
<span class="line"><span style="color:#babed8;">    // 第四阶段：蓝牙硬件状态检查</span></span>
<span class="line"><span style="color:#babed8;">    // ============================================</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 检查设备是否支持蓝牙</span></span>
<span class="line"><span style="color:#babed8;">    final isAvailable = await FlutterBluetoothSerial.instance.isAvailable;</span></span>
<span class="line"><span style="color:#babed8;">    if (isAvailable == false) {</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;蓝牙不可用,返回状态码: \${BluetoothStatus[&#39;BLUETOOTH_DISABLED&#39;]}&#39;);</span></span>
<span class="line"><span style="color:#babed8;">      _compCheckBlue.complete(BluetoothStatus[&#39;BLUETOOTH_DISABLED&#39;]);</span></span>
<span class="line"><span style="color:#babed8;">      return _compCheckBlue.future;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 检查蓝牙是否已经开启</span></span>
<span class="line"><span style="color:#babed8;">    final isEnabled = await FlutterBluetoothSerial.instance.isEnabled;</span></span>
<span class="line"><span style="color:#babed8;">    if (isEnabled == false) {</span></span>
<span class="line"><span style="color:#babed8;">      // 尝试请求用户开启蓝牙</span></span>
<span class="line"><span style="color:#babed8;">      final requestResult = await FlutterBluetoothSerial.instance.requestEnable();</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;请求启用蓝牙结果: $requestResult&#39;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">      // 用户拒绝开启蓝牙</span></span>
<span class="line"><span style="color:#babed8;">      if (requestResult == false) {</span></span>
<span class="line"><span style="color:#babed8;">        // 引导用户前往系统设置页面</span></span>
<span class="line"><span style="color:#babed8;">        FlutterBluetoothSerial.instance.openSettings();</span></span>
<span class="line"><span style="color:#babed8;">        print(&#39;蓝牙未打开,请在系统设置中手动开启蓝牙&#39;);</span></span>
<span class="line"><span style="color:#babed8;">        _compCheckBlue.complete(BluetoothStatus[&#39;BLUETOOTH_DISABLED&#39;]);</span></span>
<span class="line"><span style="color:#babed8;">        return _compCheckBlue.future;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;蓝牙状态: 打开&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 所有检查通过，返回设备未找到状态（等待后续扫描）</span></span>
<span class="line"><span style="color:#babed8;">    _compCheckBlue.complete(BluetoothStatus[&#39;DEVICE_NOT_FOUND&#39;]);</span></span>
<span class="line"><span style="color:#babed8;">  } catch (e) {</span></span>
<span class="line"><span style="color:#babed8;">    // 捕获所有异常，防止程序崩溃</span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;蓝牙状态检查异常: $e&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    _compCheckBlue.complete(BluetoothStatus[&#39;PERMISSION_DENIED&#39;]);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  return _compCheckBlue.future;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h4 id="_2-3-权限设计亮点" tabindex="-1">2.3 权限设计亮点 <a class="header-anchor" href="#_2-3-权限设计亮点" aria-label="Permalink to &quot;2.3 权限设计亮点&quot;">​</a></h4><p>AI在设计权限系统时采用了以下策略：</p><p><strong>1. 渐进式权限请求</strong></p><p>我们没有一次性请求所有权限，而是分步骤逐一请求。这样做的好处是：</p><ul><li>用户更容易理解为什么需要这些权限</li><li>如果某个权限被永久拒绝，我们可以立即告知用户，而不是等到后续操作才报错</li><li>提供更好的用户体验和透明度</li></ul><p><strong>2. 状态缓存与即时检查</strong></p><p>每次操作前都会检查权限状态，而不是依赖缓存的权限结果。这样可以避免因用户手动撤销权限而导致的异常。</p><p><strong>3. 友好的错误提示</strong></p><p>当权限被拒绝时，我们提供了清晰的错误信息和解决建议：</p><ul><li>&quot;请授予附近设备权限以使用蓝牙功能&quot;</li><li>&quot;设备蓝牙未打开，请在系统设置中开启蓝牙&quot;</li></ul><hr><h3 id="三、蓝牙设备扫描机制" tabindex="-1">三、蓝牙设备扫描机制 <a class="header-anchor" href="#三、蓝牙设备扫描机制" aria-label="Permalink to &quot;三、蓝牙设备扫描机制&quot;">​</a></h3><h4 id="_3-1-扫描流程设计" tabindex="-1">3.1 扫描流程设计 <a class="header-anchor" href="#_3-1-扫描流程设计" aria-label="Permalink to &quot;3.1 扫描流程设计&quot;">​</a></h4><p>设备扫描是蓝牙连接中最关键也是最复杂的步骤之一。AI设计了以下扫描流程：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Future&lt;dynamic&gt; _scanBlue() async {</span></span>
<span class="line"><span style="color:#babed8;">  Completer&lt;dynamic&gt; _compScanBlue = Completer();</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 第一步：进行蓝牙状态和权限检查</span></span>
<span class="line"><span style="color:#babed8;">  await _checkBlue().then((value) async {</span></span>
<span class="line"><span style="color:#babed8;">    int status = value;</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 初始化扫描状态</span></span>
<span class="line"><span style="color:#babed8;">    resultScan = ScanResult.NONE;</span></span>
<span class="line"><span style="color:#babed8;">    _thisScan = false;</span></span>
<span class="line"><span style="color:#babed8;">    _discoveredDevices.clear();</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 停止之前的扫描（避免资源冲突和重复扫描）</span></span>
<span class="line"><span style="color:#babed8;">    await _discoverySubscription?.cancel();</span></span>
<span class="line"><span style="color:#babed8;">    _scanTimer?.cancel();</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 第二步：启动蓝牙设备发现</span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;正在调用 startDiscovery()...&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    try {</span></span>
<span class="line"><span style="color:#babed8;">      _discoverySubscription = FlutterBluetoothSerial.instance.startDiscovery().listen(</span></span>
<span class="line"><span style="color:#babed8;">        (device) {</span></span>
<span class="line"><span style="color:#babed8;">          // ============================================</span></span>
<span class="line"><span style="color:#babed8;">          // 设备去重处理</span></span>
<span class="line"><span style="color:#babed8;">          // ============================================</span></span>
<span class="line"><span style="color:#babed8;">          // 使用Set集合确保每个设备只被处理一次</span></span>
<span class="line"><span style="color:#babed8;">          if (_discoveredDevices.contains(device.device.address)) {</span></span>
<span class="line"><span style="color:#babed8;">            return;</span></span>
<span class="line"><span style="color:#babed8;">          }</span></span>
<span class="line"><span style="color:#babed8;">          _discoveredDevices.add(device.device.address);</span></span>
<span class="line"><span style="color:#babed8;">          </span></span>
<span class="line"><span style="color:#babed8;">          // ============================================</span></span>
<span class="line"><span style="color:#babed8;">          // 目标设备匹配</span></span>
<span class="line"><span style="color:#babed8;">          // ============================================</span></span>
<span class="line"><span style="color:#babed8;">          // 检查发现的设备是否符合我们的目标设备列表</span></span>
<span class="line"><span style="color:#babed8;">          if (defaultDriverName.indexOf(device.device.name ?? &#39;&#39;) &gt; -1) {</span></span>
<span class="line"><span style="color:#babed8;">            // 确保只处理第一个匹配的设备</span></span>
<span class="line"><span style="color:#babed8;">            if (!_thisScan) {</span></span>
<span class="line"><span style="color:#babed8;">              // 判断设备的配对状态</span></span>
<span class="line"><span style="color:#babed8;">              resultScan = device.device.isBonded </span></span>
<span class="line"><span style="color:#babed8;">                ? ScanResult.BONDED    // 已与系统配对</span></span>
<span class="line"><span style="color:#babed8;">                : ScanResult.UNPAIRED; // 未配对</span></span>
<span class="line"><span style="color:#babed8;">              </span></span>
<span class="line"><span style="color:#babed8;">              // 保存目标设备的MAC地址</span></span>
<span class="line"><span style="color:#babed8;">              _defaultDriverMac = device.device.address.toString();</span></span>
<span class="line"><span style="color:#babed8;">              _thisScan = true;</span></span>
<span class="line"><span style="color:#babed8;">              </span></span>
<span class="line"><span style="color:#babed8;">              print(&#39;找到目标设备: \${device.device.name}, 地址: \${device.device.address}&#39;);</span></span>
<span class="line"><span style="color:#babed8;">            }</span></span>
<span class="line"><span style="color:#babed8;">          }</span></span>
<span class="line"><span style="color:#babed8;">        },</span></span>
<span class="line"><span style="color:#babed8;">        // 错误处理</span></span>
<span class="line"><span style="color:#babed8;">        onError: (error) {</span></span>
<span class="line"><span style="color:#babed8;">          print(&#39;扫描出错: $error&#39;);</span></span>
<span class="line"><span style="color:#babed8;">        },</span></span>
<span class="line"><span style="color:#babed8;">        // 扫描完成处理</span></span>
<span class="line"><span style="color:#babed8;">        onDone: () {</span></span>
<span class="line"><span style="color:#babed8;">          print(&#39;扫描流结束&#39;);</span></span>
<span class="line"><span style="color:#babed8;">        },</span></span>
<span class="line"><span style="color:#babed8;">      );</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;startDiscovery() 调用成功,监听已设置&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    } catch (e) {</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;启动扫描异常: $e&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 第三步：设置扫描超时定时器</span></span>
<span class="line"><span style="color:#babed8;">    // 这是非常重要的保护机制，防止扫描无限进行浪费电量</span></span>
<span class="line"><span style="color:#babed8;">    _scanTimer = Timer(Duration(seconds: scanDuration), () {</span></span>
<span class="line"><span style="color:#babed8;">      _discoverySubscription?.cancel();</span></span>
<span class="line"><span style="color:#babed8;">      // 返回扫描结果</span></span>
<span class="line"><span style="color:#babed8;">      if (!_compScanBlue.isCompleted) {</span></span>
<span class="line"><span style="color:#babed8;">        _compScanBlue.complete(resultScan == ScanResult.NONE ? status : resultScan);</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    });</span></span>
<span class="line"><span style="color:#babed8;">  });</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  return _compScanBlue.future;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h4 id="_3-2-扫描结果枚举" tabindex="-1">3.2 扫描结果枚举 <a class="header-anchor" href="#_3-2-扫描结果枚举" aria-label="Permalink to &quot;3.2 扫描结果枚举&quot;">​</a></h4><p>为了清晰地区分不同的扫描结果，AI定义了以下枚举：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">/// 蓝牙扫描结果枚举</span></span>
<span class="line"><span style="color:#babed8;">enum ScanResult {</span></span>
<span class="line"><span style="color:#babed8;">  NONE,       // 未找到设备 - 扫描完成但未发现目标设备</span></span>
<span class="line"><span style="color:#babed8;">  BONDED,     // 找到已配对设备 - 之前已与系统配对过</span></span>
<span class="line"><span style="color:#babed8;">  UNPAIRED   // 找到未配对设备 - 需要进行配对操作</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>这个简单的枚举对整个连接流程至关重要，它决定了后续应该采取什么样的连接策略。</p><h4 id="_3-3-扫描设计亮点" tabindex="-1">3.3 扫描设计亮点 <a class="header-anchor" href="#_3-3-扫描设计亮点" aria-label="Permalink to &quot;3.3 扫描设计亮点&quot;">​</a></h4><p><strong>1. 设备去重机制</strong></p><p>使用 <code>Set&lt;String&gt;</code> 存储设备地址，可以自动去除重复发现。这是非常必要的，因为蓝牙扫描过程中，同一个设备可能会被多次发现。</p><p><strong>2. 单次匹配策略</strong></p><p>设置 <code>_thisScan</code> 标志，确保只处理第一个匹配的设备。这避免了当多个目标设备同时存在时的歧义。</p><p><strong>3. 超时保护机制</strong></p><p>使用 <code>Timer</code> 设置扫描超时，这是节约电量的关键。在物联网环境中，电力是宝贵资源，我们不能让蓝牙无限扫描下去。</p><p><strong>4. 配对状态识别</strong></p><p>在扫描阶段就区分已配对和未配对设备，可以让后续的连接策略更加精准。</p><hr><h3 id="四、连接策略实现" tabindex="-1">四、连接策略实现 <a class="header-anchor" href="#四、连接策略实现" aria-label="Permalink to &quot;四、连接策略实现&quot;">​</a></h3><h4 id="_4-1-已配对设备连接" tabindex="-1">4.1 已配对设备连接 <a class="header-anchor" href="#_4-1-已配对设备连接" aria-label="Permalink to &quot;4.1 已配对设备连接&quot;">​</a></h4><p>对于已经与系统配对的设备，连接过程相对简单：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">/// 连接已配对的蓝牙设备</span></span>
<span class="line"><span style="color:#babed8;">/// 适用场景：设备之前已经成功配对过</span></span>
<span class="line"><span style="color:#babed8;">/// 优势：速度快，用户体验好</span></span>
<span class="line"><span style="color:#babed8;">Future&lt;int&gt; _connectToBondedDevice() async {</span></span>
<span class="line"><span style="color:#babed8;">  print(&#39;发现已配对设备,直接连接设备地址: $_defaultDriverMac&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  try {</span></span>
<span class="line"><span style="color:#babed8;">    // 直接通过MAC地址建立连接</span></span>
<span class="line"><span style="color:#babed8;">    final connection = await BluetoothConnection.toAddress(_defaultDriverMac);</span></span>
<span class="line"><span style="color:#babed8;">    _connection = connection;</span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;蓝牙连接成功&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    return BluetoothStatus[&#39;CONNECTED_SUCCESS&#39;];</span></span>
<span class="line"><span style="color:#babed8;">  } catch (e) {</span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;蓝牙连接失败: $e&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    return BluetoothStatus[&#39;CONNECTION_FAILED&#39;];</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p><strong>适用场景</strong>：</p><ul><li>设备之前已经成功配对过</li><li>配对信息仍然保存在系统中</li><li>需要快速重连</li></ul><p><strong>AI设计思路</strong>： 已配对设备的连接是最简单的场景，因为配对过程已经在之前完成，现在只需要建立连接即可。我们使用 <code>BluetoothConnection.toAddress()</code> 方法直接建立连接。</p><h4 id="_4-2-未配对设备连接" tabindex="-1">4.2 未配对设备连接 <a class="header-anchor" href="#_4-2-未配对设备连接" aria-label="Permalink to &quot;4.2 未配对设备连接&quot;">​</a></h4><p>对于未配对的设备，需要先进行配对操作：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">/// 配对并连接未配对的蓝牙设备</span></span>
<span class="line"><span style="color:#babed8;">/// 适用场景：首次连接或配对信息已丢失</span></span>
<span class="line"><span style="color:#babed8;">/// 流程：配对 -&gt; 连接</span></span>
<span class="line"><span style="color:#babed8;">Future&lt;int&gt; _bondAndConnectDevice() async {</span></span>
<span class="line"><span style="color:#babed8;">  print(&#39;发现未配对设备,先配对设备地址: $_defaultDriverMac&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  try {</span></span>
<span class="line"><span style="color:#babed8;">    // 第一步：设备配对</span></span>
<span class="line"><span style="color:#babed8;">    // 这会触发系统的配对对话框（如果需要PIN码）</span></span>
<span class="line"><span style="color:#babed8;">    await FlutterBluetoothSerial.instance.bondDeviceAtAddress(_defaultDriverMac);</span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;配对成功,开始蓝牙连接&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 第二步：建立连接</span></span>
<span class="line"><span style="color:#babed8;">    final connection = await BluetoothConnection.toAddress(_defaultDriverMac);</span></span>
<span class="line"><span style="color:#babed8;">    _connection = connection;</span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;配对和连接成功&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    return BluetoothStatus[&#39;CONNECTED_SUCCESS&#39;];</span></span>
<span class="line"><span style="color:#babed8;">  } catch (e) {</span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;配对或连接失败: $e&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    return BluetoothStatus[&#39;CONNECTION_FAILED&#39;];</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p><strong>适用场景</strong>：</p><ul><li>首次连接新设备</li><li>之前配对信息被清除</li><li>需要用户确认配对</li></ul><p><strong>AI设计思路</strong>： 未配对设备的连接需要两个步骤：先配对，再连接。这里使用 <code>bondDeviceAtAddress()</code> 方法触发系统配对流程。这个方法可能会弹出系统配对对话框（如果设备需要PIN码）。</p><h4 id="_4-3-连接状态预检查" tabindex="-1">4.3 连接状态预检查 <a class="header-anchor" href="#_4-3-连接状态预检查" aria-label="Permalink to &quot;4.3 连接状态预检查&quot;">​</a></h4><p>在实际连接之前，我们需要检查是否已经建立了连接：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">/// 检查是否已连接到目标设备</span></span>
<span class="line"><span style="color:#babed8;">Future&lt;bool&gt; _checkIfConnected() async {</span></span>
<span class="line"><span style="color:#babed8;">  print(&#39;========== 检查目标设备连接状态 ==========&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  try {</span></span>
<span class="line"><span style="color:#babed8;">    // 1. 检查内存中是否已有活跃连接</span></span>
<span class="line"><span style="color:#babed8;">    // 这是最快的检查方式</span></span>
<span class="line"><span style="color:#babed8;">    if (_connection != null &amp;&amp; _connection!.isConnected) {</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;已建立蓝牙连接&#39;);</span></span>
<span class="line"><span style="color:#babed8;">      return true;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 2. 获取已配对设备列表，检查目标设备是否已配对</span></span>
<span class="line"><span style="color:#babed8;">    // 如果设备已经配对但未连接，我们可以快速重连</span></span>
<span class="line"><span style="color:#babed8;">    final bondedDevices = await FlutterBluetoothSerial.instance.getBondedDevices();</span></span>
<span class="line"><span style="color:#babed8;">    for (var device in bondedDevices) {</span></span>
<span class="line"><span style="color:#babed8;">      if (defaultDriverName.contains(device.name)) {</span></span>
<span class="line"><span style="color:#babed8;">        print(&#39;发现已配对的目标设备: \${device.name}&#39;);</span></span>
<span class="line"><span style="color:#babed8;">        return true;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;未连接到目标设备&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    return false;</span></span>
<span class="line"><span style="color:#babed8;">  } catch (e) {</span></span>
<span class="line"><span style="color:#babed8;">    print(&#39;检查连接状态异常: $e&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    return false;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><hr><h3 id="五、自动重连机制" tabindex="-1">五、自动重连机制 <a class="header-anchor" href="#五、自动重连机制" aria-label="Permalink to &quot;五、自动重连机制&quot;">​</a></h3><h4 id="_5-1-重连策略设计" tabindex="-1">5.1 重连策略设计 <a class="header-anchor" href="#_5-1-重连策略设计" aria-label="Permalink to &quot;5.1 重连策略设计&quot;">​</a></h4><p>这是实现“自动连接”功能的核心机制。通过智能的重连策略，我们可以确保在各种异常情况下都能恢复连接：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Future connBlue() async {</span></span>
<span class="line"><span style="color:#babed8;">  await _connBlue().then((value) {</span></span>
<span class="line"><span style="color:#babed8;">    int status;</span></span>
<span class="line"><span style="color:#babed8;">    String? _errorMsg;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    status = value as int;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 根据不同状态码设置用户友好的错误信息</span></span>
<span class="line"><span style="color:#babed8;">    if (status == BluetoothStatus[&#39;CONNECTION_FAILED&#39;]) {</span></span>
<span class="line"><span style="color:#babed8;">      _errorMsg = &#39;找到音箱, 连接失败&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    } else if (status == BluetoothStatus[&#39;CONNECTED_SUCCESS&#39;]) {</span></span>
<span class="line"><span style="color:#babed8;">      _errorMsg = &#39;找到音箱,连接成功&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    } else if (status == BluetoothStatus[&#39;CONNECTED&#39;]) {</span></span>
<span class="line"><span style="color:#babed8;">      _errorMsg = &#39;音箱已经连接&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    } else if (status == BluetoothStatus[&#39;DEVICE_NOT_FOUND&#39;]) {</span></span>
<span class="line"><span style="color:#babed8;">      _errorMsg = &#39;没有找到音箱,请确认音箱已经打开&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    } else if (status == BluetoothStatus[&#39;BLUETOOTH_DISABLED&#39;]) {</span></span>
<span class="line"><span style="color:#babed8;">      _errorMsg = &#39;设备蓝牙未打开,请在系统设置中开启蓝牙&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    } else if (status == BluetoothStatus[&#39;PERMISSION_DENIED&#39;]) {</span></span>
<span class="line"><span style="color:#babed8;">      _errorMsg = &#39;没有获取到所需权限(蓝牙扫描),请在系统设置中手动授予&quot;附近设备&quot;权限&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    } else {</span></span>
<span class="line"><span style="color:#babed8;">      _errorMsg = &#39;未知错误&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    print(_errorMsg);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // ============================================</span></span>
<span class="line"><span style="color:#babed8;">    // 核心：自动重连逻辑</span></span>
<span class="line"><span style="color:#babed8;">    // ============================================</span></span>
<span class="line"><span style="color:#babed8;">    // 只有在以下可恢复的错误情况下才进行重试</span></span>
<span class="line"><span style="color:#babed8;">    if ([</span></span>
<span class="line"><span style="color:#babed8;">      BluetoothStatus[&#39;DEVICE_NOT_FOUND&#39;],    // 设备未找到</span></span>
<span class="line"><span style="color:#babed8;">      BluetoothStatus[&#39;BLUETOOTH_DISABLED&#39;], // 蓝牙未开启</span></span>
<span class="line"><span style="color:#babed8;">      BluetoothStatus[&#39;PERMISSION_DENIED&#39;],   // 权限被拒（可能用户后来授予了）</span></span>
<span class="line"><span style="color:#babed8;">      BluetoothStatus[&#39;CONNECTION_FAILED&#39;]    // 连接失败（可能是暂时性的）</span></span>
<span class="line"><span style="color:#babed8;">    ].contains(status)) {</span></span>
<span class="line"><span style="color:#babed8;">      // 等待指定间隔后自动重试</span></span>
<span class="line"><span style="color:#babed8;">      Timer(Duration(seconds: scanTimeInterval), () async {</span></span>
<span class="line"><span style="color:#babed8;">        connBlue();  // 递归调用，形成循环直到成功</span></span>
<span class="line"><span style="color:#babed8;">      });</span></span>
<span class="line"><span style="color:#babed8;">    } else {</span></span>
<span class="line"><span style="color:#babed8;">      // 对于已连接等状态，不需要重试</span></span>
<span class="line"><span style="color:#babed8;">      print(&#39;连接成功或不需要重试,流程结束&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  });</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h4 id="_5-2-重连参数配置" tabindex="-1">5.2 重连参数配置 <a class="header-anchor" href="#_5-2-重连参数配置" aria-label="Permalink to &quot;5.2 重连参数配置&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">class BlueTooth {</span></span>
<span class="line"><span style="color:#babed8;">  // 自动连接设备名称列表</span></span>
<span class="line"><span style="color:#babed8;">  // 可以配置多个设备名，系统会依次尝试连接</span></span>
<span class="line"><span style="color:#babed8;">  List defaultDriverName = [];</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 每次扫描的持续时间（秒）</span></span>
<span class="line"><span style="color:#babed8;">  // 建议值：5-15秒</span></span>
<span class="line"><span style="color:#babed8;">  // 太短可能找不到设备，太长浪费电量</span></span>
<span class="line"><span style="color:#babed8;">  int scanDuration = 10;</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 两次扫描之间的间隔时间（秒）</span></span>
<span class="line"><span style="color:#babed8;">  // 建议值：10-30秒</span></span>
<span class="line"><span style="color:#babed8;">  // 这个间隔要足够让用户打开设备</span></span>
<span class="line"><span style="color:#babed8;">  int scanTimeInterval = 15;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h4 id="_5-3-重连设计亮点" tabindex="-1">5.3 重连设计亮点 <a class="header-anchor" href="#_5-3-重连设计亮点" aria-label="Permalink to &quot;5.3 重连设计亮点&quot;">​</a></h4><p><strong>1. 智能重试条件</strong></p><p>我们只对可恢复的错误进行重试：</p><ul><li><code>DEVICE_NOT_FOUND</code>：设备未找到，可能设备刚打开</li><li><code>BLUETOOTH_DISABLED</code>：蓝牙被关闭，可能用户刚打开</li><li><code>PERMISSION_DENIED</code>：权限被拒绝，可能用户后来授予了</li><li><code>CONNECTION_FAILED</code>：连接失败，可能是暂时性网络问题</li></ul><p>对于永久性错误（如未知错误），我们选择不重试，避免无意义的循环。</p><p><strong>2. 可配置间隔</strong></p><p>允许自定义重试间隔，平衡用户体验和功耗。在不同场景下可以调整这个值：</p><ul><li>系统启动时：较短间隔（5-10秒）</li><li>日常维护：正常间隔（15秒）</li><li>低电量模式：较长间隔（30秒以上）</li></ul><p><strong>3. 递归重试</strong></p><p>使用递归调用实现持续重连，直到成功或用户干预。这种设计简单而有效，不需要额外的心跳机制。</p><hr><h3 id="六、完整连接流程图" tabindex="-1">六、完整连接流程图 <a class="header-anchor" href="#六、完整连接流程图" aria-label="Permalink to &quot;六、完整连接流程图&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">┌──────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span style="color:#babed8;">│                           connBlue() 入口                            │</span></span>
<span class="line"><span style="color:#babed8;">│                    系统启动时自动调用                              │</span></span>
<span class="line"><span style="color:#babed8;">└──────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#babed8;">                                    │</span></span>
<span class="line"><span style="color:#babed8;">                                    ▼</span></span>
<span class="line"><span style="color:#babed8;">┌──────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span style="color:#babed8;">│                    _checkIfConnected() 检查连接状态                   │</span></span>
<span class="line"><span style="color:#babed8;">│  ┌────────────────────────────────────────────────────────────────┐  │</span></span>
<span class="line"><span style="color:#babed8;">│  │  检查方式：                                                    │  │</span></span>
<span class="line"><span style="color:#babed8;">│  │  1. 检查内存中的连接对象是否有效 (_connection.isConnected)     │  │</span></span>
<span class="line"><span style="color:#babed8;">│  │  2. 获取已配对设备列表，检查目标设备是否已配对                 │  │</span></span>
<span class="line"><span style="color:#babed8;">│  └────────────────────────────────────────────────────────────────┘  │</span></span>
<span class="line"><span style="color:#babed8;">└──────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="color:#babed8;">                                    │</span></span>
<span class="line"><span style="color:#babed8;">                    ┌───────────────┴───────────────┐</span></span>
<span class="line"><span style="color:#babed8;">                    │                               │</span></span>
<span class="line"><span style="color:#babed8;">                    ▼                               ▼</span></span>
<span class="line"><span style="color:#babed8;">            ┌─────────────┐               ┌─────────────────┐</span></span>
<span class="line"><span style="color:#babed8;">            │  已连接/已配对 │               │   未连接/未配对  │</span></span>
<span class="line"><span style="color:#babed8;">            │  (return true) │               │ (return false)  │</span></span>
<span class="line"><span style="color:#babed8;">            └─────────────┘               └─────────────────┘</span></span>
<span class="line"><span style="color:#babed8;">                    │                               │</span></span>
<span class="line"><span style="color:#babed8;">                    ▼                               ▼</span></span>
<span class="line"><span style="color:#babed8;">        ┌───────────────────┐           ┌─────────────────────────────┐</span></span>
<span class="line"><span style="color:#babed8;">        │ 返回 CONNECTED    │           │     _scanBlue() 开始扫描    │</span></span>
<span class="line"><span style="color:#babed8;">        │ 直接结束流程      │           │  ┌─────────────────────────┐│</span></span>
<span class="line"><span style="color:#babed8;">        └───────────────────┘           │  │ 1. 权限检查              ││</span></span>
<span class="line"><span style="color:#babed8;">                                        │  │ 2. 设备扫描              ││</span></span>
<span class="line"><span style="color:#babed8;">                                        │  │ 3. 目标匹配              ││</span></span>
<span class="line"><span style="color:#babed8;">                                        │  │ 4. 超时保护              ││</span></span>
<span class="line"><span style="color:#babed8;">                                        │  └─────────────────────────┘│</span></span>
<span class="line"><span style="color:#babed8;">                                        └─────────────────────────────┘</span></span>
<span class="line"><span style="color:#babed8;">                                                            │</span></span>
<span class="line"><span style="color:#babed8;">                                            ┌───────────────┴───────────────┐</span></span>
<span class="line"><span style="color:#babed8;">                                            ▼                               ▼</span></span>
<span class="line"><span style="color:#babed8;">                                    ┌─────────────┐               ┌─────────────┐</span></span>
<span class="line"><span style="color:#babed8;">                                    │ ScanResult  │               │ ScanResult   │</span></span>
<span class="line"><span style="color:#babed8;">                                    │   BONDED    │               │  UNPAIRED    │</span></span>
<span class="line"><span style="color:#babed8;">                                    │ (已配对)    │               │ (未配对)     │</span></span>
<span class="line"><span style="color:#babed8;">                                    └─────────────┘               └─────────────┘</span></span>
<span class="line"><span style="color:#babed8;">                                            │                               │</span></span>
<span class="line"><span style="color:#babed8;">                                            ▼                               ▼</span></span>
<span class="line"><span style="color:#babed8;">                            ┌───────────────────────────┐ ┌─────────────────────────────┐</span></span>
<span class="line"><span style="color:#babed8;">                            │ _connectToBondedDevice() │ │ _bondAndConnectDevice()     │</span></span>
<span class="line"><span style="color:#babed8;">                            │   直接连接已配对设备      │ │   1. 配对设备               │</span></span>
<span class="line"><span style="color:#babed8;">                            │   速度快，用户体验好      │ │   2. 建立连接               │</span></span>
<span class="line"><span style="color:#babed8;">                            └───────────────────────────┘ └─────────────────────────────┘</span></span>
<span class="line"><span style="color:#babed8;">                                            │                               │</span></span>
<span class="line"><span style="color:#babed8;">                                            └───────────────┬───────────────┘</span></span>
<span class="line"><span style="color:#babed8;">                                                            │</span></span>
<span class="line"><span style="color:#babed8;">                                                            ▼</span></span>
<span class="line"><span style="color:#babed8;">                                            ┌─────────────────────────────────┐</span></span>
<span class="line"><span style="color:#babed8;">                                            │     判断连接结果状态码          │</span></span>
<span class="line"><span style="color:#babed8;">                                            │  CONNECTED_SUCCESS (201)       │</span></span>
<span class="line"><span style="color:#babed8;">                                            │  CONNECTION_FAILED (400)        │</span></span>
<span class="line"><span style="color:#babed8;">                                            └─────────────────────────────────┘</span></span>
<span class="line"><span style="color:#babed8;">                                                            │</span></span>
<span class="line"><span style="color:#babed8;">                        ┌───────────────────────────────────┼───────────────────────────────────┐</span></span>
<span class="line"><span style="color:#babed8;">                        │                                   │                                   │</span></span>
<span class="line"><span style="color:#babed8;">                        ▼                                   ▼                                   ▼</span></span>
<span class="line"><span style="color:#babed8;">                ┌─────────────┐                   ┌─────────────┐                   ┌─────────────┐</span></span>
<span class="line"><span style="color:#babed8;">                │   201成功   │                   │  400失败    │                   │  其他错误   │</span></span>
<span class="line"><span style="color:#babed8;">                │  流程结束  │                   │  等待重试   │                   │   (结束)    │</span></span>
<span class="line"><span style="color:#babed8;">                └─────────────┘                   └─────────────┘                   └─────────────┘</span></span>
<span class="line"><span style="color:#babed8;">                                                    │</span></span>
<span class="line"><span style="color:#babed8;">                                                    ▼</span></span>
<span class="line"><span style="color:#babed8;">                                            ┌─────────────────┐</span></span>
<span class="line"><span style="color:#babed8;">                                            │ 等待scanTimeInterval秒  │</span></span>
<span class="line"><span style="color:#babed8;">                                            │    自动重试     │</span></span>
<span class="line"><span style="color:#babed8;">                                            └─────────────────┘</span></span>
<span class="line"><span style="color:#babed8;">                                                    │</span></span>
<span class="line"><span style="color:#babed8;">                                                    ▼</span></span>
<span class="line"><span style="color:#babed8;">                                        ┌─────────────────────────┐</span></span>
<span class="line"><span style="color:#babed8;">                                        │    connBlue() 递归     │</span></span>
<span class="line"><span style="color:#babed8;">                                        │    (回到起点)          │</span></span>
<span class="line"><span style="color:#babed8;">                                        └─────────────────────────┘</span></span></code></pre></div><hr><h3 id="七、状态码定义与错误处理" tabindex="-1">七、状态码定义与错误处理 <a class="header-anchor" href="#七、状态码定义与错误处理" aria-label="Permalink to &quot;七、状态码定义与错误处理&quot;">​</a></h3><h4 id="_7-1-状态码设计" tabindex="-1">7.1 状态码设计 <a class="header-anchor" href="#_7-1-状态码设计" aria-label="Permalink to &quot;7.1 状态码设计&quot;">​</a></h4><p>AI设计了HTTP风格的状态码，便于理解和记忆：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">/// 蓝牙连接状态码</span></span>
<span class="line"><span style="color:#babed8;">const Map BluetoothStatus = {</span></span>
<span class="line"><span style="color:#babed8;">  &quot;CONNECTED&quot;: 200,           // 已连接到目标设备</span></span>
<span class="line"><span style="color:#babed8;">  &quot;CONNECTED_SUCCESS&quot;: 201,   // 连接成功</span></span>
<span class="line"><span style="color:#babed8;">  &quot;CONNECTION_FAILED&quot;: 400,   // 连接失败</span></span>
<span class="line"><span style="color:#babed8;">  &quot;DEVICE_NOT_FOUND&quot;: 404,    // 未找到设备</span></span>
<span class="line"><span style="color:#babed8;">  &quot;BLUETOOTH_DISABLED&quot;: 401, // 蓝牙未打开/不可用</span></span>
<span class="line"><span style="color:#babed8;">  &quot;PERMISSION_DENIED&quot;: 403,   // 权限不足</span></span>
<span class="line"><span style="color:#babed8;">  &quot;UNKNOWN_ERROR&quot;: 500,       // 未知错误</span></span>
<span class="line"><span style="color:#babed8;">};</span></span></code></pre></div><p><strong>设计思路</strong>：</p><ul><li>2xx系列表示成功</li><li>4xx系列表示客户端错误（设备未找到、权限问题等）</li><li>5xx系列表示服务器或未知错误</li></ul><h4 id="_7-2-错误信息映射" tabindex="-1">7.2 错误信息映射 <a class="header-anchor" href="#_7-2-错误信息映射" aria-label="Permalink to &quot;7.2 错误信息映射&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 状态码到错误信息的映射</span></span>
<span class="line"><span style="color:#babed8;">String getErrorMessage(int status) {</span></span>
<span class="line"><span style="color:#babed8;">  switch (status) {</span></span>
<span class="line"><span style="color:#babed8;">    case 200: return &#39;已连接到目标设备&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    case 201: return &#39;连接成功&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    case 400: return &#39;连接失败，请检查设备&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    case 404: return &#39;未找到设备，请确认设备已开启&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    case 401: return &#39;蓝牙未打开，请在系统设置中开启&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    case 403: return &#39;权限不足，请授予蓝牙权限&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    default: return &#39;未知错误&#39;;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><hr><h3 id="八、使用示例与最佳实践" tabindex="-1">八、使用示例与最佳实践 <a class="header-anchor" href="#八、使用示例与最佳实践" aria-label="Permalink to &quot;八、使用示例与最佳实践&quot;">​</a></h3><h4 id="_8-1-基础用法" tabindex="-1">8.1 基础用法 <a class="header-anchor" href="#_8-1-基础用法" aria-label="Permalink to &quot;8.1 基础用法&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 创建蓝牙连接器实例</span></span>
<span class="line"><span style="color:#babed8;">final bluetooth = BlueTooth();</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 设置目标设备名称</span></span>
<span class="line"><span style="color:#babed8;">// 系统会自动连接列表中的第一个匹配设备</span></span>
<span class="line"><span style="color:#babed8;">bluetooth.defaultDriverName = [&#39;Speaker001&#39;, &#39;BT-Speaker&#39;, &#39;MyBluetooth&#39;];</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 配置参数（可选）</span></span>
<span class="line"><span style="color:#babed8;">bluetooth.scanDuration = 10;      // 每次扫描10秒</span></span>
<span class="line"><span style="color:#babed8;">bluetooth.scanTimeInterval = 15; // 重试间隔15秒</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 启动自动连接</span></span>
<span class="line"><span style="color:#babed8;">bluetooth.connBlue();</span></span></code></pre></div><h4 id="_8-2-在应用启动时自动连接" tabindex="-1">8.2 在应用启动时自动连接 <a class="header-anchor" href="#_8-2-在应用启动时自动连接" aria-label="Permalink to &quot;8.2 在应用启动时自动连接&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">void main() {</span></span>
<span class="line"><span style="color:#babed8;">  runApp(MyApp());</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 应用启动后自动尝试蓝牙连接</span></span>
<span class="line"><span style="color:#babed8;">  // 使用addPostFrameCallback确保在Widget树构建完成后执行</span></span>
<span class="line"><span style="color:#babed8;">  WidgetsBinding.instance.addPostFrameCallback((_) {</span></span>
<span class="line"><span style="color:#babed8;">    final bluetooth = BlueTooth();</span></span>
<span class="line"><span style="color:#babed8;">    bluetooth.defaultDriverName = [&#39;Speaker001&#39;];</span></span>
<span class="line"><span style="color:#babed8;">    bluetooth.connBlue();</span></span>
<span class="line"><span style="color:#babed8;">  });</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h4 id="_8-3-监听连接状态" tabindex="-1">8.3 监听连接状态 <a class="header-anchor" href="#_8-3-监听连接状态" aria-label="Permalink to &quot;8.3 监听连接状态&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 可以在外部监听连接状态变化</span></span>
<span class="line"><span style="color:#babed8;">class BluetoothStatusNotifier extends ChangeNotifier {</span></span>
<span class="line"><span style="color:#babed8;">  bool _isConnected = false;</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  bool get isConnected =&gt; _isConnected;</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  void updateStatus(bool connected) {</span></span>
<span class="line"><span style="color:#babed8;">    _isConnected = connected;</span></span>
<span class="line"><span style="color:#babed8;">    notifyListeners();</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><hr><h3 id="九、总结与优化建议" tabindex="-1">九、总结与优化建议 <a class="header-anchor" href="#九、总结与优化建议" aria-label="Permalink to &quot;九、总结与优化建议&quot;">​</a></h3><h4 id="_9-1-设计亮点总结" tabindex="-1">9.1 设计亮点总结 <a class="header-anchor" href="#_9-1-设计亮点总结" aria-label="Permalink to &quot;9.1 设计亮点总结&quot;">​</a></h4><table><thead><tr><th>特性</th><th>实现方式</th><th>优势</th></tr></thead><tbody><tr><td>权限管理</td><td>分步请求+状态检查</td><td>兼容Android 6.0到14.0所有版本</td></tr><tr><td>设备扫描</td><td>Set去重+超时保护</td><td>效率高，资源占用少</td></tr><tr><td>差异化连接</td><td>Bonded/Unpaired分支</td><td>针对性强，成功率高</td></tr><tr><td>自动重连</td><td>递归+定时器</td><td>稳定可靠，无需人工干预</td></tr><tr><td>日志系统</td><td>完整的状态记录</td><td>便于问题排查</td></tr></tbody></table><h4 id="_9-2-后续优化方向" tabindex="-1">9.2 后续优化方向 <a class="header-anchor" href="#_9-2-后续优化方向" aria-label="Permalink to &quot;9.2 后续优化方向&quot;">​</a></h4><p><strong>1. 连接状态持久化</strong> 记录成功连接的设备信息（MAC地址、设备名称），下次启动时优先尝试连接历史设备，而不是每次都扫描。</p><p><strong>2. 多设备支持</strong> 扩展系统支持同时连接多个蓝牙设备（音箱+打印机+传感器等），实现更丰富的系统功能。</p><p><strong>3. 电量优化</strong> 根据设备电量水平动态调整扫描频率和重试间隔，在低电量模式下降低扫描频率以节省电力。</p><p><strong>4. UI反馈</strong> 添加连接状态的可视化界面，让用户清楚地知道当前连接状态，以及何时需要手动干预。</p><p><strong>5. 连接质量监控</strong> 添加连接质量检测，在连接不稳定时主动断连并重连，提供更稳定的连接体验。</p><hr><p>这套蓝牙自动连接系统已经在工业物联网中稳定运行，通过AI的辅助设计，成功处理了Android碎片化带来的各种兼容性问题，实现了真正意义上“即插即用”的自动连接体验。系统能够在启动后自动连接蓝牙设备，无需用户任何干预，大大提升了物联网系统的用户体验和功能完整性。</p>`,130)])])}const u=a(p,[["render",o]]);export{y as __pageData,u as default};
