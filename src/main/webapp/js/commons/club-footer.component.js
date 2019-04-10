//Sample layout component with default text

export const clubFooterComponent = {
    bindings: {
        text: '@' //Component attribute (single binding)
    },
    template: `
    <footer class="card text-right well bg-light">
            <div class="card-body">                
                <p class="card-text" > 
                    <span ng-if="!$ctrl.text">
                        Made with <span class="text-danger">❤</span> in DAW
                    </span>
                    {{$ctrl.text}}
                </p>
            </div>
        </footer>
    `
};
