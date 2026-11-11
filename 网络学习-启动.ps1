$ErrorActionPreference = 'SilentlyContinue'
$proj = 'C:\Users\李光为\network-learning'
Set-Location $proj

# 判断 3000 端口是否有进程在监听。
# 不用 Get-NetTCPConnection：它在非管理员/某些环境下会静默失败，导致误判为“没在跑”
# 而重复拉起第二个 next dev，两个实例并发写 .next 会把生成的路由类型写坏。
function Test-DevPort {
    $client = New-Object Net.Sockets.TcpClient
    try {
        $client.Connect('127.0.0.1', 3000)
        return $true
    } catch {
        return $false
    } finally {
        $client.Close()
    }
}

# 判断是否已经能响应 HTTP（首次编译期间端口已开但还会 503/超时）。
function Test-DevUp {
    try {
        $r = Invoke-WebRequest -Uri 'http://127.0.0.1:3000' -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

if (-not (Test-DevPort)) {
    $log = Join-Path $env:TEMP 'network-learning-dev.log'
    $err = Join-Path $env:TEMP 'network-learning-dev.err.log'
    Start-Process -FilePath 'npm.cmd' -ArgumentList @('run','dev') -WorkingDirectory $proj -WindowStyle Hidden -RedirectStandardOutput $log -RedirectStandardError $err | Out-Null

    # 等它真的能服务，最多 60 秒，避免浏览器开在 503 上。
    for ($i = 0; $i -lt 30; $i++) {
        Start-Sleep -Seconds 2
        if (Test-DevUp) { break }
    }
}

Start-Process 'http://localhost:3000'
