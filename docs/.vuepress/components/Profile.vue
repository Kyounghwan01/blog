<template lang="html">
  <div class="profile" @mouseover="upHere = true" @mouseleave="upHere = false">
    <img class="profile__image" src="./img/profile.png" />
    <div class="profile__content">
      <div class="profile__name">
        <span>노경환</span>

        <div
          class="profile__github"
          onClick="{window.open('https://github.com/Kyounghwan01/blog')}"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <mask
              id="github"
              width="20"
              height="20"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse"
            >
              <path
                fill="#ffffff"
                fill-rule="evenodd"
                d="M6.69 15.944c0 .08-.093.145-.21.145-.133.012-.226-.053-.226-.145 0-.081.093-.146.21-.146.12-.012.226.053.226.146zm-1.255-.182c-.028.08.053.173.174.198.105.04.226 0 .25-.081.024-.08-.053-.173-.174-.21-.104-.028-.221.012-.25.093zm1.783-.068c-.117.028-.198.104-.186.197.012.08.117.133.238.105.117-.028.198-.105.186-.186-.012-.076-.121-.129-.238-.116zM9.87.242C4.278.242 0 4.488 0 10.08c0 4.471 2.815 8.298 6.835 9.645.516.093.697-.226.697-.488 0-.25-.012-1.63-.012-2.476 0 0-2.822.605-3.415-1.202 0 0-.46-1.173-1.121-1.475 0 0-.924-.633.064-.621 0 0 1.004.08 1.557 1.04.883 1.557 2.363 1.109 2.94.843.092-.645.354-1.093.645-1.36-2.255-.25-4.529-.576-4.529-4.455 0-1.109.307-1.665.952-2.375-.105-.262-.448-1.342.105-2.738C5.56 4.157 7.5 5.51 7.5 5.51a9.474 9.474 0 0 1 2.532-.344c.86 0 1.726.117 2.533.343 0 0 1.939-1.355 2.782-1.089.552 1.4.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.63 4.456.372.319.686.923.686 1.87 0 1.36-.012 3.041-.012 3.372 0 .262.186.58.698.488C17.266 18.379 20 14.552 20 10.08 20 4.488 15.464.24 9.871.24zM3.919 14.149c-.052.04-.04.133.029.21.064.064.157.093.21.04.052-.04.04-.133-.029-.21-.064-.064-.157-.092-.21-.04zm-.435-.326c-.028.052.012.117.093.157.064.04.145.028.173-.028.028-.053-.012-.117-.093-.158-.08-.024-.145-.012-.173.029zm1.306 1.435c-.064.053-.04.174.053.25.092.093.21.105.262.04.052-.052.028-.173-.053-.25-.088-.092-.21-.104-.262-.04zm-.46-.593c-.064.04-.064.146 0 .238.065.093.174.133.226.093.065-.053.065-.157 0-.25-.056-.093-.16-.133-.225-.08z"
                clip-rule="evenodd"
              ></path>
            </mask>
            <g mask="url(#github)">
              <path fill="currentColor" d="M0 0h20v20H0z"></path>
            </g>
          </svg>
        </div>

        <a class="profile-mail">
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 32 32"
            data-testid="email"
          >
            <path
              fill="currentColor"
              d="M16 16.871L1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z"
            ></path>
          </svg>
        </a>
        <div class="mail-box" v-if="!!upHere" @click="doCopy">
          noh5524@gmail.com
        </div>
      </div>
      <div class="profile__desc">
        이 글이 도움이 되셨다면! 깃헙 스타 부탁드립니다 😊😄 <br />
        <!-- 블로그 제작 문의는 메일로 보내주세요!! -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      upHere: false
    };
  },
  methods: {
    doCopy() {
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.");
      }

      const textarea = document.createElement("textarea");
      textarea.value = "noh5524@gmail.com";
      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = "fixed";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("클립보드에 이메일 주소가 복사되었습니다!");
    }
  }
};
</script>

<style scoped>
.profile {
  display: flex;
  margin: 30px 0 50px;
}
.profile__github {
  display: inline-block;
  margin-right: 5px;
}
.profile__github:hover {
  cursor: pointer;
}
.profile__image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}
.profile__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  width: 100%;
}
.profile__name span {
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: bold;
  color: rgb(33, 37, 41);
  margin-right: 10px;
}
.profile__desc {
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 0.25rem;
  color: rgb(73, 80, 87);
  letter-spacing: -0.004em;
}
a {
  color: rgb(45, 61, 80);
}
.profile__name {
  display: flex;
  align-items: center;
}
.mail-box {
  margin-left: 10px;
  border-radius: 6px;
  padding: 3px 5px;
  color: white;
  background: rgb(45, 61, 80);
}
.mail-box:hover {
  cursor: pointer;
}
</style>
