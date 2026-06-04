const View = {
    ROWS: "rows",
    TILES: "tiles",
};

const animateButton = (button) => {
    button.classList.remove("is-animating");
    void button.offsetWidth;
    button.classList.add("is-animating");
};

const animatePosts = (section) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const items = section.querySelectorAll(".posts__item");

    items.forEach((item) => {
        item.getAnimations().forEach((animation) => animation.cancel());
    });

    void section.offsetWidth;

    items.forEach((item) => {
        item.animate(
            [
                { opacity: 0, transform: "translateY(18px)" },
                { opacity: 1, transform: "translateY(0)" },
            ],
            {
                duration: 340,
                easing: "ease-out",
                fill: "both",
            },
        );
    });
};

const setView = (section, buttons, view) => {
    section.dataset.view = view;

    buttons.forEach((button) => {
        const isActive = button.dataset.postsView === view;

        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
};

export const initPostsView = () => {
    const section = document.querySelector("[data-posts]");

    if (!section) {
        return;
    }

    const viewButtons = [...section.querySelectorAll("[data-posts-view]")];

    viewButtons.forEach((button) => {
        button.addEventListener("animationend", () => {
            button.classList.remove("is-animating");
        });

        button.addEventListener("click", () => {
            const nextView = button.dataset.postsView;

            if (nextView === View.ROWS || nextView === View.TILES) {
                setView(section, viewButtons, nextView);
                animateButton(button);
                animatePosts(section);
            }
        });
    });

};
