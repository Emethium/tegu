export default function ToasterInstance () {

  if (typeof window.ToasterInstance_ !== 'undefined')
    return Promise.resolve(window.ToasterInstance_);

  window.ToasterInstance_ = new Toaster();

  return Promise.resolve(window.ToasterInstance_);
}

class Toaster {

  constructor () {
    this.view = document.querySelector('.toast-view');
    this.hideTimeout = 0;
    this.hideBound = this.hide.bind(this);
  }

  toast (message) {

    this.view.textContent = message;
    this.view.classList.add('toast-view--visible');

    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(this.hideBound, 3000);
  }

  hide () {
    this.view.classList.remove('toast-view--visible');
  }
}
