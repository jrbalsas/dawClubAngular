//Sample layout component

export const clubHeaderComponent = {
    bindings: {
        text: '@' //Component attribute (single binding)
    },
    template: `
        <header class="page-header">
            <h1>
                <a href="index.html"><img src="images/logo.png"></a>
                {{$ctrl.text}}
            </h1>
        </header>
    `
};
