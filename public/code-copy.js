(function () {
  const copiedText = "已复制";
  const defaultText = "复制";

  function copyWithFallback(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function normalizeLanguage(language) {
    const aliases = {
      shell: "bash",
      sh: "bash",
      zsh: "bash",
      console: "bash",
      terminal: "bash",
      ps1: "powershell",
      pwsh: "powershell",
      js: "javascript",
      ts: "typescript",
      md: "markdown",
    };

    const normalized = language.toLowerCase();
    return aliases[normalized] ?? normalized;
  }

  function getLanguageFromClassList(...classLists) {
    for (const classList of classLists) {
      for (const className of classList) {
        const match = className.match(/^(?:language|lang)-(.+)$/);
        if (match) {
          return normalizeLanguage(match[1]);
        }
      }
    }

    return "";
  }

  function getLanguageFromElement(...elements) {
    for (const element of elements) {
      const language = element.dataset.language || element.getAttribute("data-lang");
      if (language) {
        return normalizeLanguage(language);
      }
    }

    return getLanguageFromClassList(...elements.map((element) => element.classList));
  }

  function looksLikeShellCommand(text) {
    const firstCommand = text
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith("#"));

    return /^(?:\$ |sudo |systemctl |journalctl |nginx |npm |pnpm |yarn |node |python |pip |git |ssh |scp |rsync |curl |wget |docker |docker-compose |cd |ls |mkdir |rm |cp |mv |cat |grep |rg )/.test(
      firstCommand ?? "",
    );
  }

  function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll(".content-body pre");

    codeBlocks.forEach((pre) => {
      if (pre.parentElement?.classList.contains("code-block-wrapper")) {
        return;
      }

      const code = pre.querySelector("code");
      if (!code) {
        return;
      }

      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";

      const detectedLanguage = getLanguageFromElement(pre, code);
      const isShellCommand = looksLikeShellCommand(code.innerText);
      const language =
        detectedLanguage === "text" && isShellCommand
          ? "bash"
          : detectedLanguage || (isShellCommand ? "bash" : "");

      if (language) {
        const label = document.createElement("span");
        label.className = "code-language-label";
        label.textContent = language;
        wrapper.appendChild(label);
      }

      const button = document.createElement("button");
      button.className = "code-copy-button";
      button.type = "button";
      button.textContent = defaultText;
      button.setAttribute("aria-label", "复制代码块内容");

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(button);

      button.addEventListener("click", async () => {
        try {
          await copyWithFallback(code.innerText);
          button.textContent = copiedText;
          button.classList.add("is-copied");
          window.setTimeout(() => {
            button.textContent = defaultText;
            button.classList.remove("is-copied");
          }, 1400);
        } catch {
          button.textContent = "复制失败";
          window.setTimeout(() => {
            button.textContent = defaultText;
          }, 1400);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceCodeBlocks);
  } else {
    enhanceCodeBlocks();
  }

  document.addEventListener("astro:after-swap", enhanceCodeBlocks);
})();
