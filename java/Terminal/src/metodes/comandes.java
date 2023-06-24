package metodes;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.RandomAccessFile;
import java.util.Arrays;
import java.util.Date;
import java.util.Random;
import java.util.Scanner;
import meta_comanda.Meta;

import javax.sound.midi.MetaEventListener;

/**
 * @author oleg
 *
 */
public class comandes {
	
	//Nivell descendent de 1r Grau
	/**Imprimeix la direcció actual en la que esta l'usuari
	 * @param directoriActual variable que guarda la direcció actual en la que esta l'usuari
	 */
	public void directoriActual(File directoriActual){
		System.out.print(directoriActual);
		System.out.print(">> ");
	}
	
	/**Llegeix i guarda la comanda que insereixi l'usuari
	 * @return comanda de l'usuari
	 */
	public String llegirComanda(){
		Scanner lector = new Scanner(System.in);
		String comanda = lector.nextLine();
		return comanda;
	}
	
	/**Funció que retorna el numero de paraules que hi ha a la comanda
	 * @param comanda Comanda que introdueix l'usuari
	 * @return numero de paraules que hi ha a la comanda
	 */
	public int contarParaules(String comanda){
		int numero = 1;
		for(int x = 0;x<comanda.length();x++){
			if(comanda.charAt(x)==' '){
				numero++;
			}
		}
		return numero;
	}
	
	/**Funcio que conta el numero de directoris que hi ha a la ruta total 
	 * @param comencamentDirectoriFile ruta completa de l'usuari
	 * @return Numero de directoris que hi ha a la ruta total
	 */
	public int contarDirectoris(File comencamentDirectoriFile){
		int numero = 1;
		String frase = new String(comencamentDirectoriFile.toString());
		
		for(int x = 0;x<frase.length();x++){
			char lletra = frase.charAt(x);
			String lletraString = Character.toString(lletra);
			if(lletraString.equals("/") || lletraString.equals("\\")){
				numero++;
			}
		}
		if(System.getProperty("os.name").contains("Windows")) {
			return numero;
		}else {
			return numero-1;
		}
		
	}
	
	/**Funció que retorna la primera paraula de la comanda que introdueïxi l'usuari
	 * @param comandesSplit comanda de l'usuari separada per un espai
	 * @return primera paraula de la comanda
	 */
	public String revisarComanda(String[] comandesSplit){
		String primeraParaula = comandesSplit[0];;
		return primeraParaula;		
	}
	
	/**Array que serveix per a guardar en l'array ruta la ruta en la que estem de forma separada, per a tracatar-la més tard
	 * @param ruta array que guarda la ruta en la que estem separada per /
	 * @param comencamentDirectoriFile Ruta completa del directori on estem situats
	 */
	public void guardarEnArray(String[] ruta,File comencamentDirectoriFile){
		String frase = new String(comencamentDirectoriFile.toString());		
		String directori = "";
		int contador = 0;
		
		for(int x = 0;x<frase.length();x++){
			char lletra = frase.charAt(x);
			directori = directori.concat(Character.toString(lletra));
			
			if(lletra=='/' || lletra =='\\' || x == frase.length()-1){
				if(x!= 0){
					ruta[contador] = directori;
					contador++;
					directori = "";
				}				
			}
		}
	}
	
	/**Funció que retorna directori en el que ens trobarem si sortim del que estabem anteriorment
	 * @param ruta array que guarda la ruta en la que estem separada per /
	 * @param comencamentDirectoriFile Ruta en la que es troba l'usuari
	 * @return ruta a la que "esta" l'usuari al sortir de la que estaba anteriorment en format string
	 */
	public String surt (String[] ruta, File comencamentDirectoriFile){
		int ultimDirectori = ruta.length;
		//System.out.println(ultimDirectori);
		if(System.getProperty("os.name").contains("Windows")) {
			ruta[ultimDirectori-1] = "";
		}else{
			if(ultimDirectori == 1){
				ruta[0] = "/";
			}else{
				ruta[ultimDirectori-1] = "";
			}
		}
		String rutaCompleta = passarAString(ruta);
		return rutaCompleta;
	}
	
	/**Funció que serveix per a llistar els directoris i fitxers de la ruta en la que ens trobem, també els separa en diferents arrays
	 * @param comencamentDirectoriFile Ruta en la que es troba l'usuari
	 */
	public void llistarDirectoris (File comencamentDirectoriFile) {
		String[] listado = comencamentDirectoriFile.list();
		String[] carpetes = new String[listado.length];
		String[] fitxers = new String[listado.length];
		String[] comprovadorFitxers = new String[listado.length];
		
		for(int x = 0;x<comprovadorFitxers.length;x++){
			comprovadorFitxers[x] = comencamentDirectoriFile+File.separator+listado[x];
		}
		
		int contador = 0;
		int contador2 = 0;
		
		//Separe en carpetes i fitxers el .list
		for(int x = 0;x<listado.length;x++) {
			File guardarArxiu = new File(comprovadorFitxers[x]);//guardarArxiu
			if(guardarArxiu.isDirectory()) {
				carpetes[contador] = listado[x];
				contador++;
			}else{
				fitxers[contador2] = listado[x];
				contador2++;
			}
		}
		
		//Modifica l'array per a que l'algorisme de la bombolla no falli
		modificarArray(fitxers);
		modificarArray(carpetes);
		
		//Ordene l'array amb l'algorisme de la bombolla
		ordenarDades(fitxers);
		ordenarDades(carpetes);
		
		//Imprimeix l'array de carpetes
		for(int x = 0;x<carpetes.length;x++) {
			if(carpetes[x]!=null&&carpetes[x]!= "") {
				System.out.println("- [DIR]: "+carpetes[x]);
			}
		}
		
		//Imprimeix l'array de fitxers
		for(int x = 0;x<fitxers.length;x++) {
			if(fitxers[x]!=null&&fitxers[x]!= "") {
				System.out.print("- [ARX]: "+fitxers[x]+": ");
				File arxiuBytes = new File(comencamentDirectoriFile+File.separator+fitxers[x]);
				Date data = new Date(arxiuBytes.lastModified());
				if(fitxers[x].length()>7){
					System.out.print(arxiuBytes.length()*8+" bits\t");
				}else{
					System.out.print(arxiuBytes.length()*8+" bits\t\t");
				}
				System.out.println("Ultima data de modificació: "+data);
			}
		}
	}
	
	/**Funció que intenta entrar en el directori que li hagi especificat l'usuari
	 * @param ruta array que guarda la ruta en la que estem separada per /
	 * @param comencamentDirectoriFile Ruta en la que es troba l'usuari
	 * @param comandesSplit Comanda que ha introduït l'usuari amb un split, per a saber en quin directori entrar
	 * @param comencamentDirectori Ruta en la que es troba l'usuari transformat a String
	 * @return
	 */
	public String entra (String[] ruta, File comencamentDirectoriFile, String[] comandesSplit, String comencamentDirectori) {
		String[] listado = comencamentDirectoriFile.list();
		boolean existeix = false;
		boolean existeix2 = false;
		
		for(int x = 0;x<listado.length;x++) {
			//Revisa si la ruta indicada existeix
			if(listado[x].equals(comandesSplit[1])) {
				String comprovacioCarpeta = comencamentDirectori.concat(File.separator+listado[x]);
				File comprovacioCarpetaFile = new File(comprovacioCarpeta);
				existeix2 = true;
				//Revisa si és o no un directori
				if(comprovacioCarpetaFile.isDirectory()) {
					comencamentDirectori = comencamentDirectori.concat(File.separator+listado[x]);
					existeix = true;
				}else {
					System.out.println("No es possible entrar en un arxiu, necessita ser un directori");
				}
			}
		}
		if(!existeix && !existeix2) {
			System.out.println("La ruta especificada no existeix");
		}
		return comencamentDirectori;
	}
	
	/**Mètode que mostra el contingut d'un arxiu
	 * @param comencamentDirectori Ruta en la que es troba l'usuari transformat a String, per a després concatenar-li la que hagi ficat l'usuari
	 * @param comandesSplit Comanda que ha introduït l'usuari amb un split, per a saber en quin arxiu entrar
	 * @throws FileNotFoundException Si l'usuari fica malament el nom de l'arxiu saltara aquest fallo
	 */
	public void mostra (String comencamentDirectori, String[] comandesSplit) throws FileNotFoundException {
		int ultimDirectori = comandesSplit.length-1;
		comencamentDirectori = comencamentDirectori.concat(File.separator+comandesSplit[ultimDirectori]);
		File mostrarArxiu = new File(comencamentDirectori);
		//Revisa si existeix
		if(mostrarArxiu.exists()) {
			if(mostrarArxiu.isFile()) {
				if(mostrarArxiu.length()>0) {
					Scanner lector = new Scanner(mostrarArxiu);
					while(lector.hasNextLine()) {
						System.out.print(lector.nextLine());
						System.out.println("");
					}
					//En cas de ser un arxiu buit imprimeix un missatge de que no hi ha cap dada
				}else {
					Scanner lector = new Scanner(mostrarArxiu);
					while(lector.hasNextLine()) {
						System.out.print(lector.nextLine());
						System.out.println("");
					}
					System.out.println("L'arxiu est� buit");
				}
			}else {
				System.out.println("Ha de ser un arxiu, no un directori");
			}
		}else {
			System.out.println("L'arxiu especificat no existeix");
		}
	}
	
	/**M�tode que retorna si el origen existeix o no
	 * @param comencamentDirectori directori en el que esta l'usuari
	 * @param comandesSplit comanda que insereix l'usuari
	 * @return si el origen existeix o no
	 */
	public boolean comprovarOrigen(String comencamentDirectori, String[] comandesSplit){
		File comprovantOrigen = new File(comencamentDirectori+File.separator+comandesSplit[1]);
		if(comprovantOrigen.exists()){
			return true;
		}else{
			return false;
		}
	}
	
	/**M�tode que retorna si el dest� existeix o no
	 * @param comencamentDirectori directori en el que esta l'usuari
	 * @param comandesSplit comanda que insereix l'usuari
	 * @return si el dest� existeix o no
	 */
	public boolean comprovarDesti(String comencamentDirectori, String[] comandesSplit){
		File comprovantDesti = new File(comencamentDirectori+File.separator+comandesSplit[2]);
		if(comprovantDesti.exists()){
			return true;
		}else{
			return false;
		}
	}
	
	/**M�tode que copia els bytes
	 * @param comencamentDirectori directori en el que esta l'usuari
	 * @param comandesSplit comanda que insereix l'usuari
	 */
	public void copiarBytes(String comencamentDirectori, String[] comandesSplit){
		File nomFitxerAntic = new File(comencamentDirectori+File.separator+comandesSplit[1]);
		File nomFitxerNou = new File(comencamentDirectori+File.separator+comandesSplit[2]);
		try{
			RandomAccessFile raf = new RandomAccessFile(nomFitxerNou, "rw");
			RandomAccessFile rafAntic = new RandomAccessFile(nomFitxerAntic, "r");
			raf.seek(0);
			rafAntic.seek(0);
			for(int x = 0;x<nomFitxerAntic.length();x++){
				raf.writeByte(rafAntic.readByte());
			}
		}catch(Exception e){
			
		}
	}
	
	/**M�tode que copia els bytes d'un fitxer a un altre
	 * @param comencamentDirectori directori en el que esta l'usuari
	 * @param comandesSplit comanda que insereix l'usuari
	 */
	public void basura(String comencamentDirectori, String[] comandesSplit){
		File nomFitxer = new File(comencamentDirectori+File.separator+comandesSplit[1]);
		try{
			RandomAccessFile raf = new RandomAccessFile(nomFitxer, "rw");
			raf.seek(Integer.valueOf(comandesSplit[2]));
			if(comandesSplit[3].equals("abc")){
				int valorAscii = 65;
				for(int x = Integer.valueOf(comandesSplit[2])-1;raf.getFilePointer()!= 0;x--){
					raf.seek(x);
					raf.write((char)valorAscii);
					valorAscii++;
					if(valorAscii == 91){
						valorAscii = 65;
					}
				}
			}else if(comandesSplit[3].equals("fibo")){
				long contador = Integer.valueOf(comandesSplit[2])-4;
				fibonacci(1, 1, raf, contador);
				//IMPRIMIR RESULTAT
				/*if(Integer.valueOf(comandesSplit[2])%4 == 0){
					raf.seek(0);
				}else {
					raf.seek(2);
				}
				for(int x = 0;x<Integer.valueOf(comandesSplit[2]);x++) {
					System.out.println(raf.readInt());
				}*/
			}else{
				System.out.println("Ho sentim, pero el tipus indicat no existeix");
				System.out.println("Probablement en la proxima actualització 1.2 estara disponible");
			}
		}catch(Exception e){
			
		}
	}	
	
	
	/**Metode que mostra les metadades de les imatges
	 * @param comencamentDirectori directori en el que esta l'usuari
	 * @param comandesSplit comanda que insereix l'usuari
	 */
	public void meta(String comencamentDirectori, String[] comandesSplit){
		File fitxer = new File(comencamentDirectori+File.separator+comandesSplit[1]);
		boolean capAteriors = false;
		try {
			if(fitxer.exists()) {
				RandomAccessFile raf = new RandomAccessFile(fitxer, "r");
				for(int x = 0;x<1;x++){
					char a = (char) raf.readByte();
					Meta meta = new Meta();
					if(a == 'G'){
						//GIF
						meta.tractarGIF(raf);
					}else if(a == 'B'){
						//BMP
						meta.tractarBMP(raf);
					}else{
						raf.seek(6);
						char j = (char)raf.readByte();
						if(j == 'J'){
							//JPG
							meta.tractarJPG(raf, fitxer);

							capAteriors = true;
						}
						raf.seek(1);
						if((char)raf.readByte() == 'P'){
							meta.tractarPNG(raf);
							capAteriors = true;
						}else if(!capAteriors){
							System.out.println("El tipus de fitxer que ha especificat actualment no esta soportat");
							System.out.println("Probablement en la propera versi� 1.2 estara soportat");
						}
					}
				}
			}else {
				System.out.println("El fitxer no existeix");
			}			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	//2n Nivell Descendent
	/**Funció que retorna un string de l'array ruta que li passem
	 * @param ruta array que guarda la ruta en la que es troba l'usuari
	 * @return ruta transformada en un string, per a després fer-la servir en altres funcions
	 */
	public String passarAString (String[] ruta) {
		String rutaCompleta = "";
		rutaCompleta = Arrays.toString(ruta);
		rutaCompleta = rutaCompleta.replace("[", "");
		rutaCompleta = rutaCompleta.replaceAll("]", "");
		rutaCompleta = rutaCompleta.replaceAll(",", "");
		rutaCompleta = rutaCompleta.replaceAll(" ", "");
		return rutaCompleta;
	}
	
	
	/**Mètode que ordena un vector de paraules amb l'algorisme de la Bombolla
	 * @param vector nom d'array que conté la funció, és podia dir de cualsevol altra forma
	 */
	public static void ordenarDades(String[] vector){
		//Ordene vector amb algoritme Bombolla
		for(int x = 1;x<vector.length;x++){
			for(int y = 0;y<vector.length-x;y++){
				if(vector[y]!=null) {
					if(vector[y].compareTo(vector[y+1])>0){
						String aux = vector[y];
						vector[y]=vector[y+1];
						vector[y+1] = aux;
					}
				}
			}
		}
	}
	
	/**Funció que serveix per a que l'algorisme de bombolla no dones fallos
	 * @param array nom d'array que conté la funció, és podia dir de cualsevol altra forma
	 */
	public void modificarArray(String[] array) {
		for(int x = 0;x<array.length;x++) {
			if(array[x]==null) {
				array[x] = "";
			}
		}		
	}
	

	/**Funci� que retorna si existeix o no el fitxer que vol crear l'usuari
	 * @param comencamentDirectori guarda la ruta en la que es troba l'usuari
	 * @param comandesSplit comanda que insereix l'usuari
	 * @return
	 */
	public boolean comprovarExisteix(String comencamentDirectori, String[] comandesSplit){
		File nomFitxer = new File(comencamentDirectori+File.separator+comandesSplit[1]);
		if(nomFitxer.exists()){
			return false;
		}else{
			return true;
		}
	}
	
	/**Funci� que escriu a un fitxer l'algoritme de fibonacci
	 * @param inici Numero amb el que inicia el fibonacci
	 * @param segonNum Numero amb el que inicia el fibonacci
	 * @param raf Variable per a escriure al fitxer
	 * @param contador Contador per a que sapigui on ha d'escriure
	 */
	public void fibonacci(int inici, int segonNum, RandomAccessFile raf, long contador){
		try {
			if(contador<=0){
				//System.out.println(segonNum);
				raf.seek(contador);
				raf.writeInt(segonNum);
			}else{
				//System.out.println(inici);
				raf.seek(contador);
				raf.writeInt(inici);
				fibonacci(segonNum, inici+segonNum, raf, contador-4);
			}
		}catch(Exception e) {
			
		}
	}
}
