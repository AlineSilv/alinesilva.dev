function carrosselInit() {
    const botaoAnterior = "[data-botao-anterior]";
    const botaoProximo = "[data-botao-proximo]";
    const listaProjetos = "[data-carrossel]";
    const navegacao = "[data-navegacao]";
    const titulo = "[data-projeto='titulo']"
    const link = "[data-projeto='link']"
    const detalhes = "[data-projeto='detalhes']"
    const botaoVisitar = "[data-botao='visitar']"
    const botaoRepositorio = "[data-botao='repositorio']"

    const dados = {
        projetos: [
            /*{
                titulo: "Téspis",
                link: "https://tespis.vercel.app/",
                repositorio: "https://github.com/AlineSilv",
                detalhes:
                    "A film organizer, Thespis, has showcases, information on various collections of genres, directors or production companies.",
            },*/
           /* {
                titulo: "Marmitadog",
                link: "https://marmitadog.vercel.app/",
                repositorio: "https://github.com/AlineSilv",
                detalhes:
                    "Marmitadog website, a fantastic project that mobilizes people and carries out actions for street dogs.",
            },*/
            {
                titulo: "Téspis | User",
                link: "https://tespis.vercel.app/user/index.html",
                repositorio: "https://github.com/AlineSilv/streaming",
                detalhes:
                    "This site contains a registration page, login and a user page, both with an integrated backend, the project itself is still under development with a lot of content in planning, although in terms of user interactions we already have an extensive video library, gathering selections of films and more information."
            },
            
            {
                titulo: "Task Manager | User",
                link: "https://desabilitado.vercel.app/",
                repositorio: "https://github.com/AlineSilv/TaskManagerApp",
                detalhes:
                    'Local web application to manage and edit tasks. Using editing, deletion and addition, you can organize your tasks locally by date. ',
            },

            {
                titulo: "Track Manager | App",
                link: "https://desabilitado.vercel.app/",
                repositorio: "https://github.com/AlineSilv/ProductivityApp",
                detalhes:
                    'Uma visão geral do aplicativo que ainda passa por codificações, veja mais informações no repositório.',
            },

            /*{
                titulo: "Sath Finance",
            link: "https://sathfinance.vercel.app/",
            repositorio: "https://github.com/AlineSilv/sathfinance",
            detalhes:
                "This Website is aimed at the planning and constant control of financial routines."

            },*/
            
        ],
    };

    let carrossel = new Carousel(botaoAnterior, botaoProximo, listaProjetos, navegacao, titulo, link, detalhes, dados, botaoVisitar, botaoRepositorio);

    carrossel.preparaSlides();
}

export default carrosselInit;

class Carousel {
    constructor(
        anterior,
        proximo,
        listaProdutos,
        navegacao,
        titulo,
        link,
        detalhes,
        dados,
        botaoVisitar,
        botaoRepositorio
    ) {
        this.anterior = document.querySelector(anterior);
        this.proximo = document.querySelector(proximo);
        this.listaProdutos = document.querySelector(listaProdutos);
        this.navegacao = document.querySelector(navegacao);

        this.titulo = document.querySelector(titulo);
        this.link = document.querySelector(link);
        this.detalhes = document.querySelector(detalhes);
        this.dados = dados;

        this.botaoVisitar = document.querySelector(botaoVisitar);
        this.botaoRepositorio = document.querySelector(botaoRepositorio);

        this.slides = this.getListaSlides();
        this.indicadores = this.getListaIndicadores();
        this.tamanhoSlide = this.getTamanhoSlide();

        this.indiceDoSlideAtual = 0;

        this.proximo.addEventListener("click", this.proximoSlide.bind(this));
        this.anterior.addEventListener("click", this.slideAnterior.bind(this));

        this.navegacao.addEventListener(
            "click",
            this.pularParaSlide.bind(this)
        );

        this.preparaSlides();
        this.renderizarDescricao();
    }

    getListaSlides() {
        return Array.from(this.listaProdutos.children);
    }

    getListaIndicadores() {
        return Array.from(this.navegacao.children);
    }

    getTamanhoSlide() {
        return this.slides[0].offsetWidth;
    }

    getSlideAtual() {
        return this.slides[this.indiceDoSlideAtual];
    }

    proximoSlide() {
        let proximaPosicao = this.indiceDoSlideAtual + 1;
        if (proximaPosicao > this.slides.length - 1) {
            proximaPosicao = 0;
        }

        this.vaParaSlide(proximaPosicao);
    }

    slideAnterior() {
        let posicaoAnterior = this.indiceDoSlideAtual - 1;
        if (posicaoAnterior < 0) {
            posicaoAnterior = this.slides.length - 1;
        }

        this.vaParaSlide(posicaoAnterior);
    }

    getIndiceAtual() {
        return this.indicadores[this.indiceDoSlideAtual];
    }

    vaParaSlide(posicao) {
        const indicadorAtual = this.getIndiceAtual();
        this.indiceDoSlideAtual = posicao;
        const indicadorSelecionado = this.getIndiceAtual();

        this.scrollParaSlide(this.getSlideAtual());
        this.atualizaIndicadores(indicadorAtual, indicadorSelecionado);

        this.renderizarDescricao();
    }

    scrollParaSlide(slideSelecionado) {
        this.listaProdutos.style.transform =
            "translateX(-" + slideSelecionado.style.left + ")";
    }

    atualizaIndicadores(indicadorAtual, indicadorSelecionado) {
        indicadorAtual.classList.remove("carousel__indicador--ativo");
        indicadorSelecionado.classList.add("carousel__indicador--ativo");
    }

    pularParaSlide(evento) {
        if (evento.target === evento.currentTarget) return;

        const indicadorSelecionado =
            evento.target.getAttribute("data-indicador");
        this.vaParaSlide(parseInt(indicadorSelecionado));
    }

    preparaSlides() {
        this.slides.forEach((slide, i) => {
            slide.style.left = this.tamanhoSlide * i + "px";
        });
    }

    renderizarDescricao() {
        let i = this.indiceDoSlideAtual;
        let linkProjeto = this.dados.projetos[i].link;
        let linkRepositorio = this.dados.projetos[i].repositorio;

        this.titulo.innerText = this.dados.projetos[i].titulo;
        this.link.innerText = linkProjeto;
        this.link.setAttribute("href", linkProjeto);
        this.detalhes.innerText = this.dados.projetos[i].detalhes;

        this.botaoVisitar.setAttribute("onclick", `window.open('${linkProjeto}', '_blank');`);  
        this.botaoRepositorio.setAttribute("onclick", `window.open('${linkRepositorio}', '_blank');`);  
    }
}
