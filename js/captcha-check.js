// captcha-check.js
document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('notRobot');
  window.checkCaptchaCheck = function() {
    return checkbox && checkbox.checked;
  };
});
