@component('mail::message')

<h2>Welcome, {{ $body['name'] }}</h2>

<p>
    Thanks You for testing my application .
</p>

<a href="mailto:sithuhtet.kosi21@gmail.com">sithuhtet.kosi21@gmail.com</a>
<br><br>
<a href="https://sithuhtet.xyz/" target="_blank">sithuhtet.xyz</a>
<br>
<h3>Developed by SI Thu Htet</h3>

@endcomponent