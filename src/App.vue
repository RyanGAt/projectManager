<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink class="topbar-brand" to="/">
        <span class="brand-mark">PV</span>
        <div>
          <strong>ProjectVault</strong>
          <small>Sunshine Plunge workspace</small>
        </div>
      </RouterLink>
      <nav class="topbar-nav">
        <RouterLink to="/">Projects</RouterLink>
        <RouterLink to="/archive">Archive</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
      </nav>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>
