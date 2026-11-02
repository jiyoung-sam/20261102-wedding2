// 웨딩 사진 확대, 계좌번호 복사, 팝업 닫기 기능
document.addEventListener("DOMContentLoaded", () => {
  const photoModal = document.getElementById("photoModal");
  const modalImage = document.getElementById("modalImage");
  const copyModal = document.getElementById("copyModal");
  const copiedNumber = document.getElementById("copiedNumber");

  // 사진을 클릭하면 화면 중앙에 크게 표시합니다.
  document.querySelectorAll(".photo-button").forEach((button) => {
    button.addEventListener("click", () => {
      const imagePath = button.dataset.photo;
      modalImage.src = imagePath;
      photoModal.classList.add("is-open");
      photoModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  // 사진 팝업 닫기: 닫기 버튼 또는 사진 바깥 영역 클릭
  function closePhotoModal() {
    photoModal.classList.remove("is-open");
    photoModal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    document.body.style.overflow = "";
  }
  photoModal.querySelector(".modal-close").addEventListener("click", closePhotoModal);
  photoModal.addEventListener("click", (event) => {
    if (event.target === photoModal) closePhotoModal();
  });

  // 계좌번호를 클립보드에 복사하고 안내 팝업을 표시합니다.
  document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const account = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(account);
      } catch (error) {
        // 보안 설정 등으로 클립보드 사용이 막힌 경우를 위한 대체 방법
        const temporaryInput = document.createElement("textarea");
        temporaryInput.value = account;
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        document.execCommand("copy");
        temporaryInput.remove();
      }
      copiedNumber.textContent = account;
      copyModal.classList.add("is-open");
      copyModal.setAttribute("aria-hidden", "false");
    });
  });

  document.getElementById("closeCopyModal").addEventListener("click", () => {
    copyModal.classList.remove("is-open");
    copyModal.setAttribute("aria-hidden", "true");
  });
  copyModal.addEventListener("click", (event) => {
    if (event.target === copyModal) {
      copyModal.classList.remove("is-open");
      copyModal.setAttribute("aria-hidden", "true");
    }
  });

  // ESC 키를 누르면 열려 있는 팝업을 닫습니다.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePhotoModal();
      copyModal.classList.remove("is-open");
      copyModal.setAttribute("aria-hidden", "true");
    }
  });

  // 갤러리 더보기 버튼은 현재 갤러리 영역으로 이동합니다.
  document.getElementById("morePhotos").addEventListener("click", () => {
    document.querySelector(".gallery-grid").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
